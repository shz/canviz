"use strict";
var Axis = (function () {
    function Axis(scale, n, floor) {
        this.scale = scale;
        this.n = n;
        this.floor = floor;
    }
    // points(): number[];
    Axis.prototype.points = function (formatter) {
        var max = this.scale.max;
        var min = (this.floor !== undefined) ? this.floor : this.scale.min;
        var stride = (max - min) / this.n;
        if (formatter === undefined) {
            var result = [];
            for (var i = 0; i < this.n - 1; i++) {
                result.push(min + stride * i);
            }
            result.push(max); // Manually push to max to ensure it's exact
            return result.map(function (n) { return n.toString(); });
        }
        else {
            var result = [];
            for (var i = 0; i < this.n - 1; i++) {
                result.push(formatter(min + stride * i));
            }
            result.push(formatter(max));
            return result;
        }
    };
    return Axis;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Axis;
