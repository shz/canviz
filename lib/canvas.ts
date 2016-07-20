import AffineMatrix from './affine_matrix';

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

  constructor(element?: HTMLCanvasElement) {
    if (element === undefined) {
      element = createCanvas();
    }

    // Basic setup
    this.el = element;
    this.ctx = element.getContext('2d');

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

}
