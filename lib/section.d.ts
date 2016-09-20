import { IRenderChain } from './animated_canvas';
export default class Section {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    apply(target: IRenderChain, clip?: boolean): IRenderChain;
}
