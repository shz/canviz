import AffineMatrix from './affine_matrix';

type CanvasImageSource = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;

/**
 * Cross-platform method to create a canvas
 */
function createCanvas(): HTMLCanvasElement {
  // TODO - Support node-canvas
  return document.createElement('canvas');
}

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
   * A matrix equivalent to the CanvasRenderingContext2D's transform
   * matrix, *without* the device pixel ratio scaling.
   */
  _transform: AffineMatrix;

  constructor(element?: HTMLCanvasElement) {
    if (element === undefined) {
      element = createCanvas();
    }

    // Basic setup
    this.el = element;
    this.ctx = element.getContext('2d');
    this._saveCount = 0;
    this._ratio = 0;
    this._transform = new AffineMatrix();

    // Rendering hints
    {
      // These are node-canvas specific
      let ctx = this.ctx as any;
      ctx.patternQuality = 'best';
      ctx.textDrawingMode = 'path';
      ctx.antialias = 'subpixel';
    }
    this.ctx.webkitImageSmoothingEnabled = true;
  }

  /**
   * Sets the canvas size and scaling ratio
   */
  size(width: number, height: number, scaling: number = 1) {
    this.width = width;
    this.height = height;
    this.scaling = scaling;

    // The element's CSS size doesn't need to worry about pixel ratios,
    // so we can just set it directly.
    this.el.style.width = width * scaling + 'px';
    this.el.style.height = height * scaling + 'px';

    // Calculate our final ratio
    this._ratio = scaling * (typeof window === 'undefined' ? 1 : window.devicePixelRatio);

    // Apply an initial scale to the canvas to account for the scale ratio
    this.ctx.scale(this._ratio, this._ratio);
  }

  /**
   * Clears the canvas as completely as possible.  All content is erased,
   * matrices reset, global property like alpha, composite operations, etc
   * are reset to defaults.
   */
  clear() {
    this.resetTransform();
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.textAlign = 'left';
    this.ctx.globalAlpha = 1;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Resets the transformation matrix on this canvas.  Polyfilled for
   * browsers without native support.
   */
  resetTransform() {
    let ctx = this.ctx as any; // resetTransform() isn't in the TS defs
    if (ctx.resetTransform) {
      ctx.resetTransform();
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Re-apply our scaling ratio to keep things sane
    this.ctx.scale(this._ratio, this._ratio);

    // Reset our transform matrix.  Ignore the device pixel ratio and just
    // use the base scaling.
    this._transform = new AffineMatrix().scale(this.scaling, this.scaling);
  }

  /**
   * Gets the current transform matrix.  The matrix returned here is a
   * copy, so feel free to go wild and modify it to your heart's content.
   *
   * Polyfill, kinda.
   */
  get currentTransform(): AffineMatrix {
    return new AffineMatrix(this._transform);
  }

  /**
   * Push state onto the state stack
   */
  save() {
    this._saveCount++;
    this.ctx.save();
  }

  /**
   * Pop state from the state stack
   */
  restore() {
    if (this._saveCount > 0) {
      this.ctx.restore();
      this._saveCount--;
    }
  }

  // These transform functions are delegated to the underlying CanvasRenderingContext2D,
  // but we also copy their actions to our stored transform matrix.

  scale(x: number, y: number) {
    this._transform = this._transform.scale(x, y);
    this.ctx.scale(x, y);
  }
  rotate(rad: number) {
    this._transform = this._transform.rotate(rad);
    this.ctx.rotate(rad);
  }
  translate(x: number, y: number) {
    this._transform = this._transform.translate(x, y);
    this.ctx.translate(x, y);
  }
  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this._transform = this._transform.multiply(new AffineMatrix(a, b, c, d, e, f));
    this.ctx.transform(a, b, c, d, e, f);
  }
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this._transform = new AffineMatrix().scale(this.scaling, this.scaling).multiply(
      new AffineMatrix(a, b, c, d, e, f)
    );
    this.ctx.setTransform(a, b, c, d, e, f);
  }

  // The rest here is directly delegated to the CanvasRenderingContext2D

  // Compositing
  set globalAlpha(v: number) { this.ctx.globalAlpha = v; }
  get globalAlpha(): number { return this.ctx.globalAlpha; }
  set globalCompositeOperation(op: string) { this.ctx.globalCompositeOperation = op; }
  get globalCompositeOperation(): string { return this.ctx.globalCompositeOperation; }

  // Colors and styles
  set strokeStyle(v: string | CanvasGradient | CanvasPattern) { this.ctx.strokeStyle = v; }
  get strokeStyle(): string | CanvasGradient | CanvasPattern { return this.ctx.strokeStyle; }
  set fillStyle(v: string | CanvasGradient | CanvasPattern) { this.ctx.fillStyle = v; }
  get fillStyle(): string | CanvasGradient | CanvasPattern { return this.ctx.fillStyle; }
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient { return this.ctx.createLinearGradient(x0, y0, x1, y1); }
  createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient { return this.ctx.createRadialGradient(x0, y0, r0, x1, y1, r1); }
  createPattern(image: CanvasImageSource, repetition?: string): CanvasPattern { return this.ctx.createPattern(image, repetition); }

  // Shadows
  set shadowOffsetX(v: number) { this.ctx.shadowOffsetX = v; }
  get shadowOffsetX(): number { return this.ctx.shadowOffsetX; }
  set shadowOffsetY(v: number) { this.ctx.shadowOffsetY = v; }
  get shadowOffsetY(): number { return this.ctx.shadowOffsetY; }
  set shadowColor(v: string) { this.ctx.shadowColor = v; }
  get shadowColor(): string { return this.ctx.shadowColor; }

  // Rects
  clearRect(x: number, y: number, w: number, h: number) { this.ctx.clearRect(x, y, w, h); }
  fillRect(x: number, y: number, w: number, h: number) { this.ctx.fillRect(x, y, w, h); }
  strokeRect(x: number, y: number, w: number, h: number) { this.ctx.strokeRect(x, y, w, h); }

  // Path API
  beginPath() { this.ctx.beginPath(); }
  fill() { this.ctx.fill(); }
  stroke() { this.ctx.stroke(); }
  drawFocusIfNeeded(element: HTMLElement) { this.drawFocusIfNeeded(element); }
  clip() { this.ctx.clip(); }
  isPointInPath(x: number, y: number): boolean { return this.ctx.isPointInPath(x, y); }

  // Text
  fillText(text: string, x: number, y: number, maxWidth: number) { this.ctx.fillText(text, x, y, maxWidth); }
  strokeText(text: string, x: number, y: number, maxWidth: number) { this.ctx.strokeText(text, x, y, maxWidth); }
  measureText(text: string): TextMetrics { return this.ctx.measureText(text); }

  // Drawing images
  drawImage(image: CanvasImageSource, offsetX: number, offsetY: number,
            width?: number, height?: number,
            canvasOffsetWidth?: number, canvasOffsetHeight?: number,
            canvasImageWidth?: number, canvasImageHeight?: number) {
    this.ctx.drawImage(image, offsetX, offsetY,
                       width, height,
                       canvasOffsetWidth, canvasOffsetHeight,
                       canvasImageHeight, canvasImageWidth);
  }

  // Pixel manipulation
  createImageData(imageDataOrSw: number | ImageData, sh?: number): ImageData { return this.ctx.createImageData(imageDataOrSw, sh); }
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData { return this.ctx.getImageData(sx, sy, sw, sh); }
  putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number) { this.ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight); }
}
