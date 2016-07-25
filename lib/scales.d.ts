export declare class Scale {
    round: boolean;
    max: number;
    stride: number;
    size: number;
    calc(n: number): number;
}
export declare function numeric(data: number[], size: number, round?: boolean): Scale;
