import { BaseActions } from '../../base/actions';
import { TCell } from '../../../types';
export interface GeneralSearchActionsType {
    GENERAL_SEARCH: {
        keywords: string[];
        filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
    };
}
export declare class GeneralSearchActions extends BaseActions<GeneralSearchActionsType> {
    search(keywords: string[], filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean): void;
}
