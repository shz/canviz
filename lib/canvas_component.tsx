import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Canvas from './canvas';

interface ICanvasComponentProps {
  autoresize: boolean;
  renderer: (c: Canvas) => void;
}

export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
  canvas: Canvas;
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
    this.canvas = new Canvas();
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
    this.canvas.clear();
    this.props.renderer(this.canvas);
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
