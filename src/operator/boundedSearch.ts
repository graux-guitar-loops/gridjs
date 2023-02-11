import Tabular from '../tabular';
import { VNode } from 'preact';
import { HTMLContentProps } from '../view/htmlElement';
import { OneDArray, TCell, TColumn } from '../types';

export default function (
  lowerBound: number, 
  upperBound: number,
  columns: OneDArray<TColumn>,
  ignoreHiddenColumns: boolean,
  tabular: Tabular,
  selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string,
): Tabular {
  function parse_using_parseInt(string_as_number: string | undefined) {
    if((string_as_number || '').trim()) {
        return parseInt((string_as_number || '').trim(), 10);
        }
    return NaN;
    }

    function checkNull(value: number) : boolean {
         return (value === null || value === undefined)
    }
  
  return new Tabular(
    tabular.rows.filter((row, rowIndex) =>
      row.cells.some((cell, cellIndex) => {
        if (!cell) {
          return false;
        }



        if (checkNull(lowerBound) && checkNull(upperBound)) {
            return true;
        }

        if (ignoreHiddenColumns) {
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

        let data = 0;

        if (typeof selector === 'function') {
          data = parse_using_parseInt(selector(cell.data, rowIndex, cellIndex));
        } else if (typeof cell.data === 'object') {
          // HTMLContent element
          const element = cell.data as VNode<HTMLContentProps>;
          if (element && element.props && element.props.content) {
            // TODO: we should only search in the content of the element. props.content is the entire HTML element
            data = parse_using_parseInt(element.props.content);
          }
        } else {
          // primitive types
          data = Number(cell.data);
        }

        if (checkNull(lowerBound)){
            return data <= upperBound;
        } else if (checkNull(upperBound)){
            return data >= lowerBound;
        } else {
            return data >= lowerBound && data <= upperBound;
        }
      }),
    ),
  );
}
