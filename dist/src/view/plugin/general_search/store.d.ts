import BaseStore from '../../base/store';
import { GeneralSearchActionsType } from './actions';
import { TCell } from '../../../types';
export type GeneralSearchStoreState = {
    keywords: string[] | null;
    filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
};
export declare class GeneralSearchStore extends BaseStore<GeneralSearchStoreState, GeneralSearchActionsType> {
    getInitialState(): GeneralSearchStoreState;
    handle(type: any, payload: any): void;
    private search;
}
