import search from '../../operator/boundedSearch';
import Tabular from '../../tabular';
import {
  PipelineProcessor,
  PipelineProcessorProps,
  ProcessorType,
} from '../processor';
import { OneDArray, TCell, TColumn } from '../../types';

interface BoundedSearchFilterProps extends PipelineProcessorProps {
  lowerBound: number;
  upperBound: number;
  columns: OneDArray<TColumn>;
  ignoreHiddenColumns: boolean;
  selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
}

class BoundedSearchFilter extends PipelineProcessor<
  Tabular,
  BoundedSearchFilterProps
> {
  get type(): ProcessorType {
    return ProcessorType.Filter;
  }

  _process(data: Tabular): Tabular {
    if (this.props.lowerBound || this.props.upperBound) {
      return search(
        this.props.lowerBound,
        this.props.upperBound,
        this.props.columns,
        this.props.ignoreHiddenColumns,
        data,
        this.props.selector,
      );
    }

    return data;
  }
}

export default BoundedSearchFilter;
