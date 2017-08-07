"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var RenderChain = (function () {
    function RenderChain(canvas, group, active) {
        this.group = group;
        this.canvas = canvas;
        this.active = active;
    }
    RenderChain.prototype.draw = function (f) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.active) {
            this.canvas.save();
            f.apply(void 0, [this.canvas].concat(args));
            this.canvas.restore();
        }
    };
    return RenderChain;
}());
exports.RenderChain = RenderChain;
var AnimatedCanvas = (function (_super) {
    __extends(AnimatedCanvas, _super);
    function AnimatedCanvas(renderer, element) {
        var _this = _super.call(this, element) || this;
        _this._baseChain = new RenderChain(_this, 'default', true);
        /**
         * Whether or not the canvas is already undergoing a render call.  It's
         * a logic error to try to render when rendering = true.
         */
        _this.rendering = false;
        /**
         * A list of hit regions, stored in screen space coordinates
         */
        _this.regions = [];
        /**
         * A list of active render groups
         */
        _this._renderGroups = [];
        _this.renderer = renderer;
        _this.size(100, 100, 1);
        return _this;
    }
    // IRenderChain
    AnimatedCanvas.prototype.draw = function (f) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this._baseChain).draw.apply(_a, [f].concat(args));
        var _a;
    };
    // AnimatedCanvas methods
    AnimatedCanvas.prototype.render = function (groups) {
        if (groups === void 0) { groups = []; }
        if (this.rendering) {
            throw new Error('Already rendering, cannot call .render() again');
        }
        this.rendering = true;
        this._renderGroups = ['default'].concat(groups);
        this.regions = [];
        var error = null;
        this.clear();
        try {
            var result = this.renderer(this);
            if (result) {
                var r = result;
                if (r.width !== this.width && r.height !== this.height) {
                    this.size(r.width, r.height, this.scaling);
                    this.render(groups);
                }
            }
        }
        finally {
            this._renderGroups = [];
            this.rendering = false;
        }
    };
    AnimatedCanvas.prototype.group = function (name) {
        if (!this.rendering) {
            throw new Error('This method may only be called while rendering');
        }
        // Only return a valid render chain if this group is active in this
        // render call.
        return new RenderChain(this, name, this._renderGroups.indexOf(name) > -1);
    };
    /**
     * Defines a region with a name, position, and size.  The canvas' current
     * transform matrix is applied to these coordinates in order to properly
     * map them to screen space.
     */
    AnimatedCanvas.prototype.region = function (name, x, y, w, h) {
        var transform = this.currentTransform;
        // We have to do start/end because the w/h could be *translated* by
        // the transform matrix (as well as skewed, scaled, etc).  This
        // means we won't get the absolute measurement back we're expecting,
        // and the start/end approach lets us compensate for that.
        var start = transform.multiplyVector(x, y);
        var end = transform.multiplyVector(x + w, y + h);
        this.regions.push({
            name: name,
            x: start.x,
            y: start.y,
            w: end.x - start.x,
            h: end.y - start.y
        });
    };
    /**
     * Gets the names of all regions that intersect with the given coordinate
     */
    AnimatedCanvas.prototype.intersectingRegions = function (x, y) {
        return this.regions
            .filter(function (r) { return (x >= r.x) &&
            (x <= r.x + r.w) &&
            (y >= r.y) &&
            (y <= r.y + r.h); }).map(function (r) { return r.name; });
    };
    return AnimatedCanvas;
}(canvas_1.default));
exports.default = AnimatedCanvas;
