"use strict";
/**
 * Cross-platform method to create a canvas
 */
function createCanvas() {
    // TODO - Support node-canvas
    return document.createElement('canvas');
}
var Canvas = (function () {
    function Canvas(element) {
        if (element === undefined) {
            element = createCanvas();
        }
        // Basic setup
        this.el = element;
        this.ctx = element.getContext('2d');
        // Rendering hints
        {
            // These are node-canvas specific
            var ctx = this.ctx;
            ctx.patternQuality = 'best';
            ctx.textDrawingMode = 'path';
            ctx.antialias = 'subpixel';
        }
        this.ctx.webkitImageSmoothingEnabled = true;
    }
    /**
     * Sets the canvas size and scaling ratio
     */
    Canvas.prototype.size = function (width, height, scaling) {
        if (scaling === void 0) { scaling = 1; }
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
    };
    /**
     * Clears the canvas as completely as possible.  All content is erased,
     * matrices reset, global property like alpha, composite operations, etc
     * are reset to defaults.
     */
    Canvas.prototype.clear = function () {
        this.resetTransform();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.textAlign = 'left';
        this.ctx.globalAlpha = 1;
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    /**
     * Resets the transformation matrix on this canvas.  Polyfilled for
     * browsers without native support.
     */
    Canvas.prototype.resetTransform = function () {
        var ctx = this.ctx; // resetTransform() isn't in the TS defs
        if (ctx.resetTransform) {
            ctx.resetTransform();
        }
        else {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        // Re-apply our scaling ratio to keep things sane
        this.ctx.scale(this._ratio, this._ratio);
    };
    Object.defineProperty(Canvas.prototype, "globalAlpha", {
        get: function () { return this.ctx.globalAlpha; },
        // The rest here is directly delegated to the CanvasRenderingContext2D
        // Compositing
        set: function (v) { this.ctx.globalAlpha = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "globalCompositeOperation", {
        get: function () { return this.ctx.globalCompositeOperation; },
        set: function (op) { this.ctx.globalCompositeOperation = op; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "strokeStyle", {
        get: function () { return this.ctx.strokeStyle; },
        // Colors and styles
        set: function (v) { this.ctx.strokeStyle = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "fillStyle", {
        get: function () { return this.ctx.fillStyle; },
        set: function (v) { this.ctx.fillStyle = v; },
        enumerable: true,
        configurable: true
    });
    return Canvas;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Canvas;
