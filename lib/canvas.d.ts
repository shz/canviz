import AffineMatrix from './affine_matrix';
export declare type CanvasImageSource = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
export default class Canvas {
    /**
     * Underlying Canvas element
     */
    el: HTMLCanvasElement;
    /**
     * A 2d rendering context
     */
    ctx: CanvasRenderingContext2D;
    /**
     * Logical width
     */
    width: number;
    /**
     * Logical height
     */
    height: number;
    /**
     * Scaling factor
     */
    scaling: number;
    /**
     * Underlying scaling ratio.  This factors in the scaling factor as
     * well as device pixel ratios.
     */
    _ratio: number;
    /**
     * Used in our manual accounting of save/restore calls
     */
    _saveCount: number;
    /**
     * A matrix stack  equivalent to the CanvasRenderingContext2D's transform
     * matrix stack, *without* the device pixel ratio scaling.
     */
    _transformStack: AffineMatrix[];
    _transform: AffineMatrix;
    constructor(element?: HTMLCanvasElement);
    /**
     * This exists mostly for parity with the standard CanvasRenderingContext2D
     */
    readonly canvas: HTMLCanvasElement;
    /**
     * Sets the canvas size and scaling ratio
     */
    size(width: number, height: number, scaling?: number): void;
    /**
     * Clears the canvas as completely as possible.  All content is erased,
     * matrices reset, global property like alpha, composite operations, etc
     * are reset to defaults.
     */
    clear(): void;
    /**
     * Resets the transformation matrix on this canvas.  Polyfilled for
     * browsers without native support.
     */
    resetTransform(): void;
    /**
     * Gets the current transform matrix.  The matrix returned here is a
     * copy, so feel free to go wild and modify it to your heart's content.
     *
     * Polyfill, kinda.
     */
    readonly currentTransform: AffineMatrix;
    /**
     * Push state onto the state stack
     */
    save(): void;
    /**
     * Pop state from the state stack
     */
    restore(): void;
    scale(x: number, y?: number): void;
    rotate(rad: number): void;
    translate(x: number, y: number): void;
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    globalAlpha: number;
    globalCompositeOperation: string;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    fillStyle: string | CanvasGradient | CanvasPattern;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    createPattern(image: CanvasImageSource, repetition: string): CanvasPattern;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: string;
    clearRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    fill(): void;
    stroke(): void;
    drawFocusIfNeeded(element: HTMLElement): void;
    clip(): void;
    isPointInPath(x: number, y: number): boolean;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    strokeText(text: string, x: number, y: number, maxWidth: number): void;
    measureText(text: string): TextMetrics;
    drawImage(image: CanvasImageSource, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetWidth?: number, canvasOffsetHeight?: number, canvasImageWidth?: number, canvasImageHeight?: number): void;
    createImageData(imageDataOrSw: number | ImageData, sh?: number): ImageData;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
    lineWidth: number;
    lineCap: string;
    lineJoin: string;
    miterLimit: number;
    setLineDash(segments: number[]): void;
    getLineDash(): number[];
    lineDashOffset: number;
    font: string;
    textAlign: string;
    textBaseline: string;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    rect(x: number, y: number, w: number, h: number): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
}
