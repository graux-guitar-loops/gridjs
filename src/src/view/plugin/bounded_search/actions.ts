import { BaseActions } from '../../base/actions';

export interface BoundedSearchActionsType {
  BOUNDS_SEARCH: {
      lowerBound : number,
      upperBound : number
  };
}

export class BoundedSearchActions extends BaseActions<BoundedSearchActionsType> {
  search(lowerBound : number, upperBound : number): void {
    this.dispatch('BOUNDS_SEARCH', {
      lowerBound: lowerBound,
      upperBound: upperBound
    });
  }
}
