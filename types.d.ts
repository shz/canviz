import { Canvas, AnimatedCanvas, scales } from './lib';
import CanvasComponent from './react';

declare module 'canviz' {
  export {
    Canvas as Canvas,
    AnimatedCanvas as AnimatedCanvas,
    scales as scales
  };
}
declare module 'canviz/react' {
  export default CanvasComponent;
}
