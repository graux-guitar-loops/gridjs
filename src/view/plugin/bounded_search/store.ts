import BaseStore from '../../base/store';
import { BoundedSearchActionsType } from './actions';

export type BoundedSearchStoreState = { lowerBound: number | null, upperBound: number | null};

export class BoundedSearchStore extends BaseStore<
  BoundedSearchStoreState,
  BoundedSearchActionsType
> {
  getInitialState(): BoundedSearchStoreState {
    return { lowerBound: null, upperBound: null };
  }

  handle(type, payload): void {
    if (type === 'BOUNDS_SEARCH') {
      const { lowerBound, upperBound } = payload;
      this.search(lowerBound, upperBound);
    }
  }

  private search(lowerBound: number, upperBound: number): void {
    this.setState({ lowerBound, upperBound });
  }
}
