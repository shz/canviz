interface IVector {
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
  constructor(a?: number | number[] | any, b?: number, c?: number, d?: number, e?: number, f?: number) {
    if (typeof a !== 'undefined') {
      // Support cloning from another matrix/object
      if (typeof a === 'object') {
        f = a.f;
        e = a.e;
        d = a.d;
        c = a.c;
        b = a.b;
        a = a.a; // Has to be last, for hopefully obvious reasons

      // Array-like things work too
      } else if (a.length) {
        f = a[5];
        e = a[4];
        d = a[3];
        c = a[2];
        b = a[1];
        a = a[0];
      }
    } else {
      a = 1;
      b = 0;
      c = 0;
      d = 1;
      e = 0;
      f = 0;
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
  multiply(m: AffineMatrix): AffineMatrix {
    return new AffineMatrix(
      this.a * m.a + this.c * m.b,
      this.b * m.a + this.d * m.b,
      this.a * m.c + this.c * m.d,
      this.b * m.c + this.d * m.d,
      this.a * m.e + this.c * m.f + this.e,
      this.b * m.e + this.d * m.f + this.f
    );
  }

  /**
   * Multiplies a 2-element vector by this matrix.  This vector can be
   * passed either as individual elements, or as an object with .x and .y
   * properties.
   */
  multiplyVector(x: number | IVector, y?: number): IVector {
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    } else if (typeof x === 'number' && typeof y === 'number') {
      // Do nothing, everything's set up already
    } else {
      throw new Error('Invalid arguments');
    }

    return {
      x: this.a * x + this.c * y + this.e,
      y: this.b * x + this.d * y + this.f
    };
  }

  /**
   * Creates a new matrix from this matrix, rotated by the specified
   * number of radians.
   */
  rotate(rad: number): AffineMatrix {
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);

    return this.multiply(new AffineMatrix(
      cos, sin, -sin, cos, 0, 0
    ));
  }

  /**
   * Creates a new matrix from this matrix, scaled by the specified factors
   * in the x and y directions.
   */
  scale(x: number, y: number): AffineMatrix {
    return this.multiply(new AffineMatrix(
      x, 0, 0, y, 0, 0
    ));
  }

  /**
   * Creates a new matrix from this matrix, translated by the specified
   * amounts in the x and y directions.
   */
  translate(x: number, y: number): AffineMatrix {
    return this.multiply(new AffineMatrix(
      1, 0, 0, 1, x, y
    ));
  }

  /**
   * Converts this matrix to a human-readable string representation
   */
  toString(): string {
    return `| ${this.a}, ${this.c}, ${this.e} |
| ${this.b}, ${this.d}, ${this.f} |`;
  }

  /**
   * Converts this matrix to array form, i.e. [a, b, c, d, e, f]
   */
  toArray(): number[] {
    return [
      this.a,
      this.b,
      this.c,
      this.d,
      this.e,
      this.f,
    ];
  }
}
