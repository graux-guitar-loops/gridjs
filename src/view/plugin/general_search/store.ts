import BaseStore from '../../base/store';
import { GeneralSearchActionsType } from './actions';
import { TCell } from '../../../types';

export type GeneralSearchStoreState = { 
    keywords: string[] | null;
    filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
};

export class GeneralSearchStore extends BaseStore<
  GeneralSearchStoreState,
  GeneralSearchActionsType
> {
  getInitialState(): GeneralSearchStoreState {
    return { keywords: null , filterFunction:(...args) => {return args && true}};
  }

  handle(type, payload): void {
    if (type === 'GENERAL_SEARCH') {
      const { keywords, filterFunction } = payload;
      this.search(keywords, filterFunction);
    }
  }

  private search(keywords : string[], filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean): void {
    this.setState({ keywords: keywords, filterFunction: filterFunction });
  }
}
