import { h } from 'preact';
import { TCell } from '../../../types';
import { PluginBaseComponent, PluginBaseProps } from '../../../plugin';
export interface GeneralSearchConfig {
    enabled?: boolean;
    keywords?: string[];
    ignoreHiddenColumns?: boolean;
    debounceTimeout?: number;
    selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
    filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
    server?: {
        url?: (prevUrl: string, keywords: string[], data: string) => string;
        body?: (prevBody: BodyInit, keywords: string[], data: string) => BodyInit;
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
