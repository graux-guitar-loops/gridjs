import { h, RefObject } from 'preact';
import { BaseComponent } from '../../base';
import { TColumn } from '../../../types';
import { TH } from '../../table/th';
type ResizeProps = {
    column: TColumn;
    thRef: RefObject<TH>;
};
type ResizeState = {
    width: string;
    offsetStart: number;
};
export declare class Resize extends BaseComponent<ResizeProps, ResizeState> {
    private moveFn;
    private upFn;
    private getPageX;
    private start;
    private move;
    private end;
    render(): h.JSX.Element;
}
export {};
