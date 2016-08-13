import { default as AnimatedCanvas, IRenderChain, RenderFunction } from './animated_canvas';
import AffineMatrix from './affine_matrix';

class SectionRenderChain implements IRenderChain {
  section: Section;
  base: IRenderChain;

  constructor(base: IRenderChain, section: Section) {
    this.section = section;
    this.base = base;
  }

  draw(f: RenderFunction) {
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
      f(extendedCanvas);
    });
  }
}

export default class Section {
  constructor(public x: number, public y: number, public w: number, public h: number) {}

  apply(target: IRenderChain): IRenderChain {
    return new SectionRenderChain(target, this);
  }
}