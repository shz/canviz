"use strict";
var Scale = (function () {
    function Scale() {
        this.round = true;
        this.max = 0;
        this.stride = 0;
        this.size = 0;
    }
    Scale.prototype.calc = function (n) {
        var v = (n / this.max) * this.size;
        if (this.round) {
            v = Math.round(v);
        }
        return v;
    };
    return Scale;
}());
exports.Scale = Scale;
/**
 * Creates a one-dimensional scale
 */
function numeric(data, size, round) {
    if (round === void 0) { round = true; }
    var s = new Scale();
    s.round = round;
    s.size = size;
    s.stride = size / data.length;
    data.forEach(function (n) {
        if (n > s.max) {
            s.max = n;
        }
    });
    if (round) {
        s.stride = Math.round(s.stride);
    }
    return s;
}
exports.numeric = numeric;
/**
 * Creates a two-dimensional numeric plot scale, from mutiple series.
 * Theses series must contain the same number of elements.
 */
function plot(data, width, height, round) {
    if (round === void 0) { round = true; }
    var s = new Scale();
    var length = 0;
    data.forEach(function (series) {
        if (length === 0) {
            length = series.length;
        }
        else {
            if (series.length != length) {
                throw new Error('All data series must have the same length');
            }
        }
    });
    s.round = round;
    s.size = height;
    s.stride = width / length;
    data.forEach(function (series) {
        series.forEach(function (n) {
            if (n > s.max) {
                s.max = n;
            }
        });
    });
    if (round) {
        s.stride = Math.round(s.stride);
    }
    return s;
}
exports.plot = plot;
