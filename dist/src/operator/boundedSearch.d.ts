import Tabular from '../tabular';
import { OneDArray, TCell, TColumn } from '../types';
export default function (lowerBound: number, upperBound: number, columns: OneDArray<TColumn>, ignoreHiddenColumns: boolean, tabular: Tabular, selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string): Tabular;
