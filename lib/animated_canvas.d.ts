import Canvas from './canvas';
export declare type RenderFunction = (c: AnimatedCanvas) => void;
export interface IRegion {
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface IRenderChain {
    draw(f: RenderFunction): void;
}
export declare class RenderChain implements IRenderChain {
    group: string;
    canvas: AnimatedCanvas;
    active: boolean;
    constructor(canvas: AnimatedCanvas, group: string, active: boolean);
    draw(f: RenderFunction): void;
}
export default class AnimatedCanvas extends Canvas implements IRenderChain {
    renderer: RenderFunction;
    _baseChain: RenderChain;
    /**
     * Whether or not the canvas is already undergoing a render call.  It's
     * a logic error to try to render when rendering = true.
     */
    rendering: boolean;
    /**
     * A list of hit regions, stored in screen space coordinates
     */
    regions: IRegion[];
    /**
     * A list of active render groups
     */
    _renderGroups: string[];
    constructor(renderer: RenderFunction, element?: HTMLCanvasElement);
    draw(f: RenderFunction): void;
    render(groups?: string[]): void;
    group(name: string): RenderChain;
    /**
     * Defines a region with a name, position, and size.  The canvas' current
     * transform matrix is applied to these coordinates in order to properly
     * map them to screen space.
     */
    region(name: string, x: number, y: number, w: number, h: number): void;
    /**
     * Gets the names of all regions that intersect with the given coordinate
     */
    intersectingRegions(x: number, y: number): string[];
}
