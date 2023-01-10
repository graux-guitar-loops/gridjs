import Tabular from '../tabular';
import { OneDArray, TCell, TColumn } from '../types';
export default function (keywords: string[], filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean, columns: OneDArray<TColumn>, ignoreHiddenColumns: boolean, tabular: Tabular, selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string): Tabular;
