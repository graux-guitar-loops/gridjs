import { h } from 'preact';
import { TCell } from '../../../types';
import { PluginBaseComponent, PluginBaseProps } from '../../../plugin';
export interface BoundedSearchConfig {
    enabled?: boolean;
    lowerBound?: number;
    upperBound?: number;
    ignoreHiddenColumns?: boolean;
    debounceTimeout?: number;
    selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
    server?: {
        url?: (prevUrl: string, lowerBound: number, upperBound: number) => string;
        body?: (prevBody: BodyInit, lowerBound: number, upperBound: number) => BodyInit;
    };
}
export declare class BoundedSearch extends PluginBaseComponent<BoundedSearchConfig & PluginBaseProps<BoundedSearch>> {
    private readonly searchProcessor;
    private readonly actions;
    private readonly store;
    private readonly storeUpdatedFn;
    static defaultProps: {
        debounceTimeout: number;
    };
    constructor(props: any, context: any);
    componentWillUnmount(): void;
    private storeUpdated;
    private onChange;
    private getRange;
    render(): h.JSX.Element;
}
export default BoundedSearch;
