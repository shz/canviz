"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = (function () {
    /**
     *
     * @param {number} density - In points per logical screen pixel (DPI
     *                           and resolution independent!).  This will
     *                           almost always be a fractional value.  In
     *                           the case of a non-uniform point distribution
     *                           an average will be used.
     */
    function Path(points, density) {
        if (density === void 0) { density = Infinity; }
        this.points = points;
    }
    Path.prototype._mergePoints = function () {
        var results = [];
        return results;
    };
    Path.prototype.stroke = function (width, style, lineDash) {
        return function (c) {
        };
    };
    Path.prototype.fill = function (style) {
        return function (c) {
        };
    };
    return Path;
}());
exports.default = Path;
