"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var canvas_1 = require('./canvas');
var RenderChain = (function () {
    function RenderChain(canvas, group, active) {
        this.group = group;
        this.canvas = canvas;
        this.active = active;
    }
    RenderChain.prototype.draw = function (f) {
        if (this.active) {
            f(this.canvas);
        }
    };
    return RenderChain;
}());
var AnimatedCanvas = (function (_super) {
    __extends(AnimatedCanvas, _super);
    function AnimatedCanvas(renderer, element) {
        _super.call(this, element);
        this._baseChain = new RenderChain(this, 'default', true);
        /**
         * Whether or not the canvas is already undergoing a render call.  It's
         * a logic error to try to render when rendering = true.
         */
        this.rendering = false;
        /**
         * A list of active render groups
         */
        this._renderGroups = [];
        this.renderer = renderer;
    }
    AnimatedCanvas.prototype.render = function (groups) {
        if (groups === void 0) { groups = []; }
        if (this.rendering) {
            throw new Error('Already rendering, cannot call .render() again');
        }
        this.rendering = true;
        this._renderGroups = ['default'].concat(groups);
        this._renderGroups = [];
        this.rendering = false;
    };
    AnimatedCanvas.prototype.group = function (name) {
        if (!this.rendering) {
            throw new Error('This method may only be called while rendering');
        }
        // Only return a valid render chain if this group is active in this
        // render call.
        return new RenderChain(this, name, this._renderGroups.indexOf(name) > -1);
    };
    return AnimatedCanvas;
}(canvas_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimatedCanvas;
