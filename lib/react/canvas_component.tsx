import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AnimatedCanvas from '../animated_canvas';

function documentPosition(el: HTMLElement) {
  let x = 0;
  let y = 0;

  while (el) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }

  return { x, y };
}

export interface ICanvasComponentProps {
  /**
   * If true, this canvas will be automatically resized based on the
   * width/height of its containing div.
   *
   * This is useful if, for example, CSS is used to control that div's
   * size.
   */
  autoresize: boolean;
  renderer: (c: AnimatedCanvas) => void;
  onInteract?: (c: AnimatedCanvas, regions: string[]) => void;
}

export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
  canvas: AnimatedCanvas;
  _eventHandlers: (() => void)[] = [];
  _canvasPosition: { x: number, y: number } = { x: 0, y: 0 };

  constructor(props: ICanvasComponentProps) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }

  // Canvas lifecycle

  initCanvas(holder: Element) {
    this.canvas = new AnimatedCanvas(this.props.renderer);

    // If we need interactivity, wire up some event listeners
    if (this.props.onInteract) {
      let move = (e) => {
        let x = e.pageX - this._canvasPosition.x;
        let y = e.pageY - this._canvasPosition.y;

        // The if is mostly just here to help Typescript, which doesn't
        // know that the props are immutable.
        if (this.props.onInteract) {
          this.props.onInteract(this.canvas, this.canvas.intersectingRegions(x, y));
        }
      }
      let enter = (e) => {
        this._canvasPosition = documentPosition(this.canvas.el);
      };

      this.canvas.el.addEventListener('mousemove', move, false);
      this.canvas.el.addEventListener('mouseenter', enter, false);

      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mousemove', move, false));
      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mouseenter', enter, false));
    }

    holder.appendChild(this.canvas.el);
    this.sizeCanvas();
  }

  sizeCanvas() {
    let root = ReactDOM.findDOMNode(this);
    let rect = root.getBoundingClientRect();

    this.canvas.size(
      Math.floor(rect.width),
      Math.floor(rect.height)
    );
    this.renderCanvas();
  }

  renderCanvas(groups: string[] = []) {
    this.canvas.render(groups);
  }

  // React lifecycle

  componentDidMount() {
    this.initCanvas(ReactDOM.findDOMNode(this));

    if (this.props.autoresize) {
      let handleResize = () => {
        this.sizeCanvas();
      };

      window.addEventListener('resize', handleResize, false);
      this._eventHandlers.push(() => {
        window.removeEventListener('resize', handleResize, false);
      });
    }
  }

  componentWillUnmount() {
    this._eventHandlers.forEach(h => h());
    this._eventHandlers = [];
  }
}
