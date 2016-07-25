import Canvas from './canvas';
export declare type RenderFunction = (c: AnimatedCanvas) => void;
export declare class RenderChain {
    group: string;
    canvas: AnimatedCanvas;
    active: boolean;
    constructor(canvas: AnimatedCanvas, group: string, active: boolean);
    draw(f: RenderFunction): void;
}
export default class AnimatedCanvas extends Canvas {
    renderer: RenderFunction;
    _baseChain: RenderChain;
    /**
     * Whether or not the canvas is already undergoing a render call.  It's
     * a logic error to try to render when rendering = true.
     */
    rendering: boolean;
    /**
     * A list of active render groups
     */
    _renderGroups: string[];
    constructor(renderer: RenderFunction, element?: HTMLCanvasElement);
    render(groups?: string[]): void;
    group(name: string): RenderChain;
}
