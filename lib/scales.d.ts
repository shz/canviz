export declare class Scale {
    round: boolean;
    max: number;
    min: number;
    stride: number;
    size: number;
    calc(n: number): number;
}
/**
 * Creates a one-dimensional scale
 */
export declare function numeric(data: number[], size: number, round?: boolean): Scale;
/**
 * Creates a two-dimensional numeric plot scale, from mutiple series.
 * Theses series must contain the same number of elements.
 */
export declare function plot(data: number[][], width: number, height: number, round?: boolean): Scale;
