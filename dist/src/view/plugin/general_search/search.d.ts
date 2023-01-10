import { h } from 'preact';
import { TCell } from '../../../types';
import { PluginBaseComponent, PluginBaseProps } from '../../../plugin';
export interface GeneralSearchConfig {
    enabled?: boolean;
    keywords?: string[];
    ignoreHiddenColumns?: boolean;
    debounceTimeout?: number;
    selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
    filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keyword: string[], data: string) => boolean;
    server?: {
        url?: (prevUrl: string, lowerBound: number, upperBound: number) => string;
        body?: (prevBody: BodyInit, lowerBound: number, upperBound: number) => BodyInit;
    };
}
export declare class GeneralSearch extends PluginBaseComponent<GeneralSearchConfig & PluginBaseProps<GeneralSearch>> {
    private readonly searchProcessor;
    private readonly actions;
    private readonly store;
    private readonly storeUpdatedFn;
    static defaultProps: {
        debounceTimeout: number;
        keywords: any[];
    };
    constructor(props: any, context: any);
    componentWillUnmount(): void;
    private storeUpdated;
    private onChange;
    render(): h.JSX.Element;
}
export default GeneralSearch;
