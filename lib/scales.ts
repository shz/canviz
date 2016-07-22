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