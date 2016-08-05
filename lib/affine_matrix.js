"use strict";
/**
 * A 2d affine transformation matrix, very similar to the DOM's
 * SVGMatrix.  Fields are in the form:
 *
 * | a, c, e |
 * | b, d, f |
 */
var AffineMatrix = (function () {
    /**
     * Creates a new AffineMatrix
     */
    function AffineMatrix(a, b, c, d, e, f) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (e === void 0) { e = 0; }
        if (f === void 0) { f = 0; }
        // Support cloning from another matrix/object or an array
        if (typeof a === 'object') {
            if (a.length !== undefined) {
                f = a[5];
                e = a[4];
                d = a[3];
                c = a[2];
                b = a[1];
                a = a[0];
            }
            else {
                f = a.f;
                e = a.e;
                d = a.d;
                c = a.c;
                b = a.b;
                a = a.a; // Has to be last, for hopefully obvious reasons
            }
        }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }
    /**
     * Creates a new matrix with the product of this matrix and the
     * specified matrix.
     */
    AffineMatrix.prototype.multiply = function (m) {
        return new AffineMatrix(this.a * m.a + this.c * m.b, this.b * m.a + this.d * m.b, this.a * m.c + this.c * m.d, this.b * m.c + this.d * m.d, this.a * m.e + this.c * m.f + this.e, this.b * m.e + this.d * m.f + this.f);
    };
    /**
     * Multiplies a 2-element vector by this matrix.  This vector can be
     * passed either as individual elements, or as an object with .x and .y
     * properties.
     */
    AffineMatrix.prototype.multiplyVector = function (x, y) {
        if (typeof x === 'object') {
            y = x.y;
            x = x.x;
        }
        else if (typeof x === 'number' && typeof y === 'number') {
        }
        else {
            throw new Error('Invalid arguments');
        }
        return {
            x: this.a * x + this.c * y + this.e,
            y: this.b * x + this.d * y + this.f
        };
    };
    /**
     * Creates a new matrix from this matrix, rotated by the specified
     * number of radians.
     */
    AffineMatrix.prototype.rotate = function (rad) {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        return this.multiply(new AffineMatrix(cos, sin, -sin, cos, 0, 0));
    };
    /**
     * Creates a new matrix from this matrix, scaled by the specified factors
     * in the x and y directions.
     */
    AffineMatrix.prototype.scale = function (x, y) {
        return this.multiply(new AffineMatrix(x, 0, 0, y, 0, 0));
    };
    /**
     * Creates a new matrix from this matrix, translated by the specified
     * amounts in the x and y directions.
     */
    AffineMatrix.prototype.translate = function (x, y) {
        return this.multiply(new AffineMatrix(1, 0, 0, 1, x, y));
    };
    /**
     * Converts this matrix to a human-readable string representation
     */
    AffineMatrix.prototype.toString = function () {
        var top = this.a + ", " + this.c + ", " + this.e;
        var bottom = this.b + ", " + this.d + ", " + this.f;
        var pad = Math.max(top.length, bottom.length) - Math.min(top.length, bottom.length);
        var padStr = '';
        for (var i = 0; i < pad; i++) {
            padStr += ' ';
        }
        if (top.length > bottom.length) {
            bottom += padStr;
        }
        else {
            top += padStr;
        }
        // Reset padStr for layout
        padStr = '';
        for (var i = 0; i < top.length; i++) {
            padStr += ' ';
        }
        return "\u250C " + padStr + " \u2510\n\u2502 " + top + " \u2502\n\u2502 " + bottom + " \u2502\n\u2514 " + padStr + " \u2518";
    };
    /**
     * Converts this matrix to array form, i.e. [a, b, c, d, e, f]
     */
    AffineMatrix.prototype.toArray = function () {
        return [
            this.a,
            this.b,
            this.c,
            this.d,
            this.e,
            this.f,
        ];
    };
    return AffineMatrix;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AffineMatrix;
