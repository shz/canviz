import * as React from 'react';
import { default as AnimatedCanvas, RenderFunction } from '../animated_canvas';
export interface ICanvasComponentProps {
    /**
     * If true, this canvas will be automatically resized based on the
     * width/height of its containing div.
     *
     * This is useful if, for example, CSS is used to control that div's
     * size.
     */
    autoresize: boolean;
    renderer: RenderFunction;
    onInteract?: (c: AnimatedCanvas, regions: string[], mouse: {
        x: number;
        y: number;
        action: 'move' | 'down' | 'up' | 'click';
    }) => void;
    className: string;
}
export default class CanvasComponent extends React.Component<ICanvasComponentProps, void> {
    canvas: AnimatedCanvas;
    _eventHandlers: (() => void)[];
    _canvasPosition: {
        x: number;
        y: number;
    };
    _renderCb: (() => void) | undefined;
    constructor(props: ICanvasComponentProps);
    render(): any;
    initCanvas(holder: Element): void;
    inferCanvasSize(): void;
    renderCanvas(groups?: string[]): void;
    _renderCanvas(groups: string[]): void;
    _queueFrame(): void;
    _executeQueuedFrame: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
