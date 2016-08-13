import { default as AnimatedCanvas, RenderFunction } from './animated_canvas';

export default class Path {
  points: [{x: number, y: number}];

  /**
   *
   * @param {number} density - In points per logical screen pixel (DPI
   *                           and resolution independent!).  This will
   *                           almost always be a fractional value.  In
   *                           the case of a non-uniform point distribution
   *                           an average will be used.
   */
  constructor(points: [{x: number, y: number}], density: number = Infinity) {
    this.points = points;
  }

  _mergePoints(): {x: number, y: number}[] {
    let results: {x: number, y: number}[] = [];

    return results;
  }

  stroke(width: number, style: string, lineDash?: number[]): RenderFunction {
    return c => {

    };
  }
  fill(style: string): RenderFunction {
    return c => {

    }
  }
}