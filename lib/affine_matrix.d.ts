export interface IVector {
    x: number;
    y: number;
}
/**
 * A 2d affine transformation matrix, very similar to the DOM's
 * SVGMatrix.  Fields are in the form:
 *
 * | a, c, e |
 * | b, d, f |
 */
export default class AffineMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    /**
     * Creates a new AffineMatrix
     */
    constructor(a?: number | number[] | any, b?: number, c?: number, d?: number, e?: number, f?: number);
    /**
     * Creates a new matrix with the product of this matrix and the
     * specified matrix.
     */
    multiply(m: AffineMatrix): AffineMatrix;
    /**
     * Multiplies a 2-element vector by this matrix.  This vector can be
     * passed either as individual elements, or as an object with .x and .y
     * properties.
     */
    multiplyVector(x: number | IVector, y?: number): IVector;
    /**
     * Creates a new matrix from this matrix, rotated by the specified
     * number of radians.
     */
    rotate(rad: number): AffineMatrix;
    /**
     * Creates a new matrix from this matrix, scaled by the specified factors
     * in the x and y directions.
     */
    scale(x: number, y: number): AffineMatrix;
    /**
     * Creates a new matrix from this matrix, translated by the specified
     * amounts in the x and y directions.
     */
    translate(x: number, y: number): AffineMatrix;
    /**
     * Converts this matrix to a human-readable string representation
     */
    toString(): string;
    /**
     * Converts this matrix to array form, i.e. [a, b, c, d, e, f]
     */
    toArray(): number[];
}
