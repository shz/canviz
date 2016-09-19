import { default as AnimatedCanvas, IRenderChain, RenderFunction } from './animated_canvas';
import AffineMatrix from './affine_matrix';

class SectionRenderChain implements IRenderChain {
  section: Section;
  clip: boolean;
  base: IRenderChain;

  constructor(base: IRenderChain, section: Section, clip: boolean) {
    this.section = section;
    this.base = base;
    this.clip = clip;
  }

  draw(f: RenderFunction, ...args: any[]) {
    this.base.draw((c) => {
      let extendedCanvas = Object.create(c, {
        width: {
          writable: false,
          value: this.section.w
        },
        height: {
          writable: false,
          value: this.section.h
        }
      });

      c.translate(this.section.x, this.section.y);
      if (this.clip) {
        c.beginPath();
        c.moveTo(0, 0);
        c.rect(0, 0, this.section.w, this.section.h);
        c.closePath();
        c.clip();
      }
      f(extendedCanvas, ...args);
    });
  }
}

export default class Section {
  constructor(public x: number, public y: number, public w: number, public h: number) {}

  apply(target: IRenderChain, clip: boolean = false): IRenderChain {
    return new SectionRenderChain(target, this, clip);
  }
}