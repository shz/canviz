import { Scale } from './scales';
export default class Axis {
    scale: Scale;
    n: number;
    floor?: number;
    constructor(scale: Scale, n: number, floor?: number);
    points(formatter?: (number) => string): string[];
}
