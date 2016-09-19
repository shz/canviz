import Canvas from './canvas';


export type RenderFunction = (c: AnimatedCanvas, ...args: any[]) => void | {width: number, height: number};

export interface IRegion {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IRenderChain {
  draw(f: RenderFunction, ...args: any[]): void;
}

export class RenderChain implements IRenderChain {
  group: string;
  canvas: AnimatedCanvas;
  active: boolean;

  constructor(canvas: AnimatedCanvas, group: string, active: boolean) {
    this.group = group;
    this.canvas = canvas;
    this.active = active;
  }

  draw(f: RenderFunction, ...args: any[]) {
    if (this.active) {
      this.canvas.save();
      f(this.canvas, ...args);
      this.canvas.restore();
    }
  }
}

export default class AnimatedCanvas extends Canvas implements IRenderChain {
  renderer: RenderFunction;
  _baseChain: RenderChain = new RenderChain(this, 'default', true);

  /**
   * Whether or not the canvas is already undergoing a render call.  It's
   * a logic error to try to render when rendering = true.
   */
  rendering: boolean = false;

  /**
   * A list of hit regions, stored in screen space coordinates
   */
  regions: IRegion[] = [];

  /**
   * A list of active render groups
   */
  _renderGroups: string[] = [];


  constructor(renderer: RenderFunction, element?: HTMLCanvasElement) {
    super(element);

    this.renderer = renderer;

    this.size(100, 100, 1);
  }

  // IRenderChain

  draw(f: RenderFunction, ...args: any[]) {
    this._baseChain.draw(f, ...args);
  }

  // AnimatedCanvas methods

  render(groups: string[] = []) {
    if (this.rendering) {
      throw new Error('Already rendering, cannot call .render() again');
    }
    this.rendering = true;
    this._renderGroups = ['default'].concat(groups);
    this.regions = [];

    let error = null;
    this.clear();
    try {
      let result = this.renderer(this);
      if (result) {
        let r = result as {width: number, height: number};

        if (r.width !== this.width && r.height !== this.height) {
          this.size(r.width, r.height, this.scaling);
          this.render(groups);
        }
      }
    } finally {
      this._renderGroups = [];
      this.rendering = false;
    }
  }

  group(name: string): IRenderChain {
    if (!this.rendering) {
      throw new Error('This method may only be called while rendering');
    }

    // Only return a valid render chain if this group is active in this
    // render call.
    return new RenderChain(this, name, this._renderGroups.indexOf(name) > -1);
  }

  /**
   * Defines a region with a name, position, and size.  The canvas' current
   * transform matrix is applied to these coordinates in order to properly
   * map them to screen space.
   */
  region(name: string, x: number, y: number, w: number, h: number) {
    let transform = this.currentTransform;

    // We have to do start/end because the w/h could be *translated* by
    // the transform matrix (as well as skewed, scaled, etc).  This
    // means we won't get the absolute measurement back we're expecting,
    // and the start/end approach lets us compensate for that.
    let start = transform.multiplyVector(x, y);
    let end = transform.multiplyVector(x + w, y + h);

    this.regions.push({
      name: name,
      x: start.x,
      y: start.y,
      w: end.x - start.x,
      h: end.y - start.y
    });
  }

  /**
   * Gets the names of all regions that intersect with the given coordinate
   */
  intersectingRegions(x: number, y: number): string[] {
    return this.regions
      .filter(r => (x >= r.x) &&
                   (x <= r.x + r.w) &&
                   (y >= r.y) &&
                   (y <= r.y + r.h)
      ).map(r => r.name);
  }
}
