import BaseStore from '../../base/store';
import { BoundedSearchActionsType } from './actions';
export type BoundedSearchStoreState = {
    lowerBound: number | null;
    upperBound: number | null;
};
export declare class BoundedSearchStore extends BaseStore<BoundedSearchStoreState, BoundedSearchActionsType> {
    getInitialState(): BoundedSearchStoreState;
    handle(type: any, payload: any): void;
    private search;
}
