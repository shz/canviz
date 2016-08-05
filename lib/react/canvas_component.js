"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var animated_canvas_1 = require('../animated_canvas');
function documentPosition(el) {
    var x = 0;
    var y = 0;
    while (el) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return { x: x, y: y };
}
var CanvasComponent = (function (_super) {
    __extends(CanvasComponent, _super);
    function CanvasComponent(props) {
        _super.call(this, props);
        this._eventHandlers = [];
        this._canvasPosition = { x: 0, y: 0 };
    }
    CanvasComponent.prototype.render = function () {
        return (React.createElement("div", null));
    };
    // Canvas lifecycle
    CanvasComponent.prototype.initCanvas = function (holder) {
        var _this = this;
        this.canvas = new animated_canvas_1.default(this.props.renderer);
        // If we need interactivity, wire up some event listeners
        if (this.props.onInteract) {
            var move_1 = function (e) {
                var x = e.pageX - _this._canvasPosition.x;
                var y = e.pageY - _this._canvasPosition.y;
                // The if is mostly just here to help Typescript, which doesn't
                // know that the props are immutable.
                if (_this.props.onInteract) {
                    _this.props.onInteract(_this.canvas, _this.canvas.intersectingRegions(x, y), _this._canvasPosition);
                }
            };
            var enter_1 = function (e) {
                _this._canvasPosition = documentPosition(_this.canvas.el);
            };
            this.canvas.el.addEventListener('mousemove', move_1, false);
            this.canvas.el.addEventListener('mouseenter', enter_1, false);
            this._eventHandlers.push(function () { return _this.canvas.el.removeEventListener('mousemove', move_1, false); });
            this._eventHandlers.push(function () { return _this.canvas.el.removeEventListener('mouseenter', enter_1, false); });
        }
        holder.appendChild(this.canvas.el);
        this.sizeCanvas();
    };
    CanvasComponent.prototype.sizeCanvas = function () {
        var root = ReactDOM.findDOMNode(this);
        var rect = root.getBoundingClientRect();
        this.canvas.size(Math.floor(rect.width), Math.floor(rect.height));
        this.renderCanvas();
    };
    CanvasComponent.prototype.renderCanvas = function (groups) {
        if (groups === void 0) { groups = []; }
        this.canvas.render(groups);
    };
    // React lifecycle
    CanvasComponent.prototype.componentDidMount = function () {
        var _this = this;
        this.initCanvas(ReactDOM.findDOMNode(this));
        if (this.props.autoresize) {
            var handleResize_1 = function () {
                _this.sizeCanvas();
            };
            window.addEventListener('resize', handleResize_1, false);
            this._eventHandlers.push(function () {
                window.removeEventListener('resize', handleResize_1, false);
            });
        }
    };
    CanvasComponent.prototype.componentWillUnmount = function () {
        this._eventHandlers.forEach(function (h) { return h(); });
        this._eventHandlers = [];
    };
    return CanvasComponent;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CanvasComponent;
