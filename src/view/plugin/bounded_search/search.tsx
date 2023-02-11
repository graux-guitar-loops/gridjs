import { h } from 'preact';
import BoundedSearchFilter from '../../../pipeline/filter/boundedSearch';
import { classJoin, className } from '../../../util/className';
import { BoundedSearchStore, BoundedSearchStoreState } from './store';
import { BoundedSearchActions } from './actions';
import ServerBoundedSearchFilter from '../../../pipeline/filter/serverBoundedSearch';
import { debounce } from '../../../util/debounce';
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
        url?: (prevUrl: string, lowerBound : number, upperBound : number) => string;
        body?: (prevBody: BodyInit, lowerBound : number, upperBound : number) => BodyInit;
    };
}

export class BoundedSearch extends PluginBaseComponent<
BoundedSearchConfig & PluginBaseProps<BoundedSearch>
> {
    private readonly searchProcessor:
        | BoundedSearchFilter
        | ServerBoundedSearchFilter;
    private readonly actions: BoundedSearchActions;
    private readonly store: BoundedSearchStore;
    private readonly storeUpdatedFn: (...args) => void;

    static defaultProps = {
debounceTimeout: 250,
    };

    constructor(props, context) {
        super(props, context);

        this.actions = new BoundedSearchActions(this.config.dispatcher);
        this.store = new BoundedSearchStore(this.config.dispatcher);
        // const { enabled, lowerBound, upperBound } = props;
        if (true) { // TODO: check props enabled for other plugins
            // initial search
            // if (lowerBound | upperBound) this.actions.search(lowerBound, upperBound);

            this.storeUpdatedFn = this.storeUpdated.bind(this);
            this.store.on('updated', this.storeUpdatedFn);

            let searchProcessor;
            if (props.server) {
                searchProcessor = new ServerBoundedSearchFilter({
lowerBound: props.lowerBound,
upperBound: props.upperBound,
url: props.server.url,
body: props.server.body,
});
} else {
    searchProcessor = new BoundedSearchFilter({
lowerBound: null,
upperBound: null,
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

private storeUpdated(state: BoundedSearchStoreState): void {
    // updates the processor state
    this.searchProcessor.setProps({
lowerBound: state.lowerBound,
upperBound: state.upperBound,
});
}

private onChange(event): void {
    const [lower, upper] = this.getRange(event);
    this.actions.search(lower, upper);
}

private getRange(event) {
    return event.detail.values;
}



public render(){
    if (!this.props.enabled) return null;

    let onInput = this.onChange.bind(this);

    // add debounce to input only if it's a server-side search
    if (this.searchProcessor instanceof ServerBoundedSearchFilter) {
        onInput = debounce(onInput, this.props.debounceTimeout);
    }


    return (
            <div
            className={className(classJoin('search', this.config.className.search))}
            >
            <input
            type="range"
            // placeholder={this._('search.placeholder')}
            aria-label={this._('search.placeholder')}
            onInput={onInput}
            className={classJoin(
                    className('input'),
                    className('search', 'input'),
                    )}
            value={this.store.state.lowerBound}
            min={this.store.state.lowerBound}
            max={this.store.state.upperBound}
            />
            </div>
           );
}
}

export default BoundedSearch;
