import { h } from 'preact';
import GeneralSearchFilter from '../../../pipeline/filter/generalSearch';
import { classJoin, className } from '../../../util/className';
import { GeneralSearchStore, GeneralSearchStoreState } from './store';
import { GeneralSearchActions } from './actions';
import ServerGeneralSearchFilter from '../../../pipeline/filter/serverGeneralSearch';
import { debounce } from '../../../util/debounce';
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
        url?: (prevUrl: string,  keywords : string[], data: string) => string;
        body?: (prevBody: BodyInit, keywords: string[], data: string) => BodyInit;
    };
}

export class GeneralSearch extends PluginBaseComponent<
GeneralSearchConfig & PluginBaseProps<GeneralSearch>
> {
    private readonly searchProcessor:
        | GeneralSearchFilter
        | ServerGeneralSearchFilter;
    private readonly actions: GeneralSearchActions;
    private readonly store: GeneralSearchStore;
    private readonly storeUpdatedFn: (...args) => void;

    static defaultProps = {
                debounceTimeout: 250,
                 keywords: [],
    };

    constructor(props, context) {
        super(props, context);
        console.log("props", props);

        this.actions = new GeneralSearchActions(this.config.dispatcher);
        this.store = new GeneralSearchStore(this.config.dispatcher);
        // const { enabled, lowerBound, upperBound } = props;
        if (true) { // TODO: check props enabled for other plugins
                    // initial search
                    // if (lowerBound | upperBound) this.actions.search(lowerBound, upperBound);

            this.storeUpdatedFn = this.storeUpdated.bind(this);
            this.store.on('updated', this.storeUpdatedFn);

            let searchProcessor;
            if (props.server) {
                searchProcessor = new ServerGeneralSearchFilter({
keywords: props.keywords,
url: props.server.url,
body: props.server.body,
});
} else {
    searchProcessor = new GeneralSearchFilter({
keywords: props.keywords,
columns: this.config.header && this.config.header.columns,
ignoreHiddenColumns:
props.ignoreHiddenColumns ||
props.ignoreHiddenColumns === undefined,
selector: props.selector,
});
}

this.searchProcessor = searchProcessor;

// adds a new processor to the pipeline
this.config.pipeline.register(searchProcessor);
}
}

componentWillUnmount(): void {
    this.config.pipeline.unregister(this.searchProcessor);
    this.store.off('updated', this.storeUpdatedFn);
}

private storeUpdated(state: GeneralSearchStoreState): void {
    // updates the processor state
    this.searchProcessor.setProps({
keywords: state.keywords,
filterFunction: state.filterFunction,
});
}

private onChange(event): void {
    throw new Error(`Method not implemented for event target ${event.target} and actions ${this.actions}`);
}

public render(){
    throw new Error('Not implemented');
    if (!this.props.enabled) return null;

    let onInput = this.onChange.bind(this);

    // add debounce to input only if it's a server-side search
    if (this.searchProcessor instanceof ServerGeneralSearchFilter) {
        onInput = debounce(onInput, this.props.debounceTimeout);
    }


    return (
            <div
            className={className(classJoin('search', this.config.className.search))}
            >
            <input
            type="range"
            aria-label={this._('search.placeholder')}
            onInput={onInput}
            className={classJoin(
                    className('input'),
                    className('search', 'input'),
                    )}
            />
            </div>
           );
}
}

export default GeneralSearch;
