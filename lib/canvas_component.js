"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var canvas_1 = require('./canvas');
var CanvasComponent = (function (_super) {
    __extends(CanvasComponent, _super);
    function CanvasComponent(props) {
        _super.call(this, props);
        this.eventHandlers = [];
    }
    CanvasComponent.prototype.render = function () {
        return (React.createElement("div", null));
    };
    // Canvas lifecycle
    CanvasComponent.prototype.initCanvas = function (holder) {
        this.canvas = new canvas_1.default();
        holder.appendChild(this.canvas.el);
        this.sizeCanvas();
    };
    CanvasComponent.prototype.sizeCanvas = function () {
        var root = ReactDOM.findDOMNode(this);
        var rect = root.getBoundingClientRect();
        this.canvas.size(Math.floor(rect.width), Math.floor(rect.height));
        this.renderCanvas();
    };
    CanvasComponent.prototype.renderCanvas = function () {
        this.canvas.clear();
        this.props.renderer(this.canvas);
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
            this.eventHandlers.push(function () {
                window.removeEventListener('resize', handleResize_1, false);
            });
        }
    };
    CanvasComponent.prototype.componentWillUnmount = function () {
        this.eventHandlers.forEach(function (h) { return h(); });
        this.eventHandlers = [];
    };
    return CanvasComponent;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CanvasComponent;
