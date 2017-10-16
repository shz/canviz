import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { default as AnimatedCanvas, RenderFunction } from '../animated_canvas';

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
  renderer: RenderFunction;
  onInteract?: (c: AnimatedCanvas, regions: string[], mouse: {x: number, y: number, action: 'move' | 'down' | 'up' | 'click'}) => void;
  className: string;
}

export default class CanvasComponent extends React.Component<ICanvasComponentProps, never> {
  canvas: AnimatedCanvas;
  _eventHandlers: (() => void)[] = [];
  _canvasPosition: { x: number, y: number } = { x: 0, y: 0 };
  _renderCb: (() => void) | undefined = undefined;

  constructor(props: ICanvasComponentProps) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}></div>
    );
  }

  // Canvas lifecycle

  initCanvas(holder: Element) {
    this.canvas = new AnimatedCanvas(this.props.renderer);

    // If we need interactivity, wire up some event listeners
    if (this.props.onInteract) {
      let mouseEvent = (name) => (e) => {
        let x = e.pageX - this._canvasPosition.x;
        let y = e.pageY - this._canvasPosition.y;

        // The if is mostly just here to help Typescript, which doesn't
        // know that the props are immutable.
        if (this.props.onInteract) {
          this.props.onInteract(
            this.canvas,
            this.canvas.intersectingRegions(x, y),
            {x: x, y: y, action: name}
          );
        }
      };
      let enter = (e) => {
        this._canvasPosition = documentPosition(this.canvas.el);
      };
      let move = mouseEvent('move');
      let click = mouseEvent('click');
      let down = mouseEvent('down');
      let up = mouseEvent('up');

      this.canvas.el.addEventListener('mousemove', move, false);
      this.canvas.el.addEventListener('mouseenter', enter, false);
      this.canvas.el.addEventListener('mousedown', down, false);
      this.canvas.el.addEventListener('mouseup', up, false);
      this.canvas.el.addEventListener('click', click, false);

      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mousemove', move, false));
      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mouseenter', enter, false));
      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mousedown', down, false));
      this._eventHandlers.push(() => this.canvas.el.removeEventListener('mouseup', up, false));
      this._eventHandlers.push(() => this.canvas.el.removeEventListener('click', click, false));
    }

    holder.appendChild(this.canvas.el);
    this.inferCanvasSize();
  }

  inferCanvasSize() {
    let root = ReactDOM.findDOMNode(this);
    let rect = root.getBoundingClientRect();

    this.canvas.size(
      Math.floor(rect.width),
      Math.floor(rect.height)
    );
    this._renderCanvas([]);
  }

  renderCanvas(groups: string[] = []) {
    this._renderCb = () => {
      this._renderCanvas(groups);
    }
    this._queueFrame();
  }

  _renderCanvas(groups: string[]) {
    this.canvas.render(groups);
  }

  _queueFrame() {
    try {
      window.requestAnimationFrame(this._executeQueuedFrame);
    } catch (e) {
      window.setTimeout(this._executeQueuedFrame);
    }
  }

  _executeQueuedFrame = () => {
    if (this._renderCb !== undefined) {
      this._renderCb();
      this._renderCb = undefined;
    }
  }

  // React lifecycle

  componentDidMount() {
    this.initCanvas(ReactDOM.findDOMNode(this));

    if (this.props.autoresize) {
      let handleResize = () => {
        this.inferCanvasSize();
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
