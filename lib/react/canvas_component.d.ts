import * as React from 'react';
import AnimatedCanvas from '../animated_canvas';
export interface ICanvasComponentProps {
    /**
     * If true, this canvas will be automatically resized based on the
     * width/height of its containing div.
     *
     * This is useful if, for example, CSS is used to control that div's
     * size.
     */
    autoresize: boolean;
    renderer: (c: AnimatedCanvas) => void;
    onInteract?: (c: AnimatedCanvas, regions: string[]) => void;
}
export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
    canvas: AnimatedCanvas;
    _eventHandlers: (() => void)[];
    _canvasPosition: {
        x: number;
        y: number;
    };
    constructor(props: ICanvasComponentProps);
    render(): any;
    initCanvas(holder: Element): void;
    sizeCanvas(): void;
    renderCanvas(groups?: string[]): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
