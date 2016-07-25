import Canvas from './canvas';

export type RenderFunction = (c: AnimatedCanvas) => void;

export class RenderChain {
  group: string;
  canvas: AnimatedCanvas;
  active: boolean;

  constructor(canvas: AnimatedCanvas, group: string, active: boolean) {
    this.group = group;
    this.canvas = canvas;
    this.active = active;
  }

  draw(f: RenderFunction) {
    if (this.active) {
      f(this.canvas);
    }
  }
}

export default class AnimatedCanvas extends Canvas {
  renderer: RenderFunction;
  _baseChain: RenderChain = new RenderChain(this, 'default', true);

  /**
   * Whether or not the canvas is already undergoing a render call.  It's
   * a logic error to try to render when rendering = true.
   */
  rendering: boolean = false;

  /**
   * A list of active render groups
   */
  _renderGroups: string[] = [];

  constructor(renderer: RenderFunction, element?: HTMLCanvasElement) {
    super(element);

    this.renderer = renderer;
  }

  render(groups: string[] = []) {
    if (this.rendering) {
      throw new Error('Already rendering, cannot call .render() again');
    }
    this.rendering = true;
    this._renderGroups = ['default'].concat(groups);

    this._renderGroups = [];
    this.rendering = false;
  }

  group(name: string) {
    if (!this.rendering) {
      throw new Error('This method may only be called while rendering');
    }

    // Only return a valid render chain if this group is active in this
    // render call.
    return new RenderChain(this, name, this._renderGroups.indexOf(name) > -1);
  }
}