import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AnimatedCanvas from './animated_canvas';

export interface ICanvasComponentProps {
  autoresize: boolean;
  renderer: (c: AnimatedCanvas) => void;
}

export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
  canvas: AnimatedCanvas;
  eventHandlers: (() => void)[] = [];

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

  renderCanvas() {
    this.canvas.render();
  }

  // React lifecycle

  componentDidMount() {
    this.initCanvas(ReactDOM.findDOMNode(this));

    if (this.props.autoresize) {
      let handleResize = () => {
        this.sizeCanvas();
      };

      window.addEventListener('resize', handleResize, false);
      this.eventHandlers.push(() => {
        window.removeEventListener('resize', handleResize, false);
      });
    }
  }

  componentWillUnmount() {
    this.eventHandlers.forEach(h => h());
    this.eventHandlers = [];
  }
}
