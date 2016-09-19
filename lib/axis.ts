import { Scale } from './scales';

export default class Axis {
  scale: Scale;
  n: number;
  floor?: number;

  constructor(scale: Scale, n: number, floor?: number) {
    this.scale = scale;
    this.n = n;
    this.floor = floor;
  }

  // points(): number[];
  points(formatter?: (number) => string): string[] {
    const max = this.scale.max;
    const min = (this.floor !== undefined) ? this.floor : this.scale.min;
    const stride = (max - min) / this.n;

    if (formatter === undefined) {
      let result: number[] = [];
      for (let i = 0; i < this.n-1; i++) {
        result.push(min + stride * i);
      }
      result.push(max); // Manually push to max to ensure it's exact
      return result.map(n => n.toString());
    } else {
      let result: string[] = [];
      for (let i=0; i<this.n-1; i++) {
        result.push(formatter(min + stride * i));
      }
      result.push(formatter(max));
      return result;
    }
  }
}
