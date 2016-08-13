import { RenderFunction } from './animated_canvas';
export default class Path {
    points: [{
        x: number;
        y: number;
    }];
    /**
     *
     * @param {number} density - In points per logical screen pixel (DPI
     *                           and resolution independent!).  This will
     *                           almost always be a fractional value.  In
     *                           the case of a non-uniform point distribution
     *                           an average will be used.
     */
    constructor(points: [{
        x: number;
        y: number;
    }], density?: number);
    _mergePoints(): {
        x: number;
        y: number;
    }[];
    stroke(width: number, style: string, lineDash?: number[]): RenderFunction;
    fill(style: string): RenderFunction;
}
