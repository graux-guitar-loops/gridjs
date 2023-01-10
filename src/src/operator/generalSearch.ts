import Tabular from '../tabular';
import { VNode } from 'preact';
import { HTMLContentProps } from '../view/htmlElement';
import { OneDArray, TCell, TColumn } from '../types';

export default function (
  keywords: string[],
  filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean,
  columns: OneDArray<TColumn>,
  ignoreHiddenColumns: boolean,
  tabular: Tabular,
  selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string,
): Tabular {
  
  return new Tabular(
    tabular.rows.filter((row, rowIndex) =>
      row.cells.some((cell, cellIndex) => {
        if (!cell) {
          return false;
        }


        if (ignoreHiddenColumns){
        if (
          columns &&
          columns[cellIndex] &&
          typeof columns[cellIndex] === 'object'
        ) {
          const typedColumn = columns[cellIndex] as TColumn;
          if (typedColumn.hidden) {
            return false;
          }
          
        }
        }

        let data : string = '';

        if (typeof selector === 'function') {
          data = selector(cell.data, rowIndex, cellIndex);
        } else if (typeof cell.data === 'object') {
          // HTMLContent element
          const element = cell.data as VNode<HTMLContentProps>;
          if (element && element.props && element.props.content) {
            // TODO: we should only search in the content of the element. props.content is the entire HTML element
            data = element.props.content;
          }
        } else {
          // primitive types
          data = String(cell.data);
        }

        return filterFunction(cell as TCell, rowIndex, cellIndex, keywords, data);
      }),
    ),
  );
}
