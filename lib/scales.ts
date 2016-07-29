export class Scale {
  round: boolean = true;
  max: number = 0;
  stride: number = 0;
  size: number = 0;

  calc(n: number) {
    let v = (n / this.max) * this.size;
    if (this.round) {
      v = Math.round(v);
    }
    return v;
  }
}

/**
 * Creates a one-dimensional scale
 */
export function numeric(data: number[], size: number, round: boolean = true): Scale {
  let s = new Scale();

  s.round = round;
  s.size = size;
  s.stride = size / data.length;

  data.forEach(n => {
    if (n > s.max) {
      s.max = n;
    }
  });

  if (round) {
    s.stride = Math.round(s.stride);
  }

  return s;
}

/**
 * Creates a two-dimensional numeric plot scale, from mutiple series.
 * Theses series must contain the same number of elements.
 */
export function plot(data: number[][], width: number, height: number, round: boolean = true): Scale {
  let s = new Scale();

  let length = 0;
  data.forEach(series => {
    if (length === 0) {
      length = series.length;
    } else {
      if (series.length != length) {
        throw new Error('All data series must have the same length');
      }
    }
  });

  s.round = round;
  s.size = height;
  s.stride = width / length;

  data.forEach(series => {
    series.forEach(n => {
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