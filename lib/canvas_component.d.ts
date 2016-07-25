import * as React from 'react';
import AnimatedCanvas from './animated_canvas';
export interface ICanvasComponentProps {
    autoresize: boolean;
    renderer: (c: AnimatedCanvas) => void;
}
export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
    canvas: AnimatedCanvas;
    eventHandlers: (() => void)[];
    constructor(props: ICanvasComponentProps);
    render(): any;
    initCanvas(holder: Element): void;
    sizeCanvas(): void;
    renderCanvas(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
