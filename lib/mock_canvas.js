"use strict";
var MockCanvasRenderingContext2d = (function () {
    function MockCanvasRenderingContext2d(canvas) {
        this.canvas = canvas;
    }
    MockCanvasRenderingContext2d.prototype.beginPath = function () { };
    MockCanvasRenderingContext2d.prototype.clearRect = function (x, y, w, h) { };
    MockCanvasRenderingContext2d.prototype.clip = function (fillRule) { };
    MockCanvasRenderingContext2d.prototype.createImageData = function (imageDataOrSw, sh) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.createPattern = function (image, repetition) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.drawImage = function (image, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) { };
    MockCanvasRenderingContext2d.prototype.fill = function (fillRule) { };
    MockCanvasRenderingContext2d.prototype.fillRect = function (x, y, w, h) { };
    MockCanvasRenderingContext2d.prototype.fillText = function (text, x, y, maxWidth) { };
    MockCanvasRenderingContext2d.prototype.getImageData = function (sx, sy, sw, sh) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.getLineDash = function () {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.isPointInPath = function (x, y, fillRule) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.measureText = function (text) {
        throw new Error('Not implemented');
    };
    MockCanvasRenderingContext2d.prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) { };
    MockCanvasRenderingContext2d.prototype.restore = function () { };
    MockCanvasRenderingContext2d.prototype.rotate = function (angle) { };
    MockCanvasRenderingContext2d.prototype.save = function () { };
    MockCanvasRenderingContext2d.prototype.scale = function (x, y) { };
    MockCanvasRenderingContext2d.prototype.setLineDash = function (segments) { };
    MockCanvasRenderingContext2d.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) { };
    MockCanvasRenderingContext2d.prototype.stroke = function () { };
    MockCanvasRenderingContext2d.prototype.strokeRect = function (x, y, w, h) { };
    MockCanvasRenderingContext2d.prototype.strokeText = function (text, x, y, maxWidth) { };
    MockCanvasRenderingContext2d.prototype.transform = function (m11, m12, m21, m22, dx, dy) { };
    MockCanvasRenderingContext2d.prototype.translate = function (x, y) { };
    MockCanvasRenderingContext2d.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) { };
    MockCanvasRenderingContext2d.prototype.arcTo = function (x1, y1, x2, y2, radius) { };
    MockCanvasRenderingContext2d.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) { };
    MockCanvasRenderingContext2d.prototype.closePath = function () { };
    MockCanvasRenderingContext2d.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) { };
    MockCanvasRenderingContext2d.prototype.lineTo = function (x, y) { };
    MockCanvasRenderingContext2d.prototype.moveTo = function (x, y) { };
    MockCanvasRenderingContext2d.prototype.quadraticCurveTo = function (cpx, cpy, x, y) { };
    MockCanvasRenderingContext2d.prototype.rect = function (x, y, w, h) { };
    return MockCanvasRenderingContext2d;
}());
exports.MockCanvasRenderingContext2d = MockCanvasRenderingContext2d;
var MockCanvas = (function () {
    function MockCanvas() {
    }
    MockCanvas.prototype.getContext = function (contextId, contextAttributes) {
        if (contextId === '2d') {
            return new MockCanvasRenderingContext2d(this);
        }
        else {
            throw new Error('MockCanvas only supports 2d contexts');
        }
    };
    MockCanvas.prototype.toDataURL = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error('Not implemented');
    };
    MockCanvas.prototype.toBlob = function (callback) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error('Not implemented');
    };
    return MockCanvas;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MockCanvas;
