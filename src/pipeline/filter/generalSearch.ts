import search from '../../operator/generalSearch';
import Tabular from '../../tabular';
import {
  PipelineProcessor,
  PipelineProcessorProps,
  ProcessorType,
} from '../processor';
import { OneDArray, TCell, TColumn } from '../../types';

interface GeneralSearchFilterProps extends PipelineProcessorProps {
  keywords: string[];
  columns: OneDArray<TColumn>;
  ignoreHiddenColumns: boolean;
  selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
  filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
}

class GeneralSearchFilter extends PipelineProcessor<
  Tabular,
  GeneralSearchFilterProps
> {
  get type(): ProcessorType {
    return ProcessorType.Filter;
  }

  _process(data: Tabular): Tabular {
    if (this.props.keywords) {
      return search(
        this.props.keywords,
        this.props.filterFunction,
        this.props.columns,
        this.props.ignoreHiddenColumns,
        data,
        this.props.selector,
      );
    }

    return data;
  }
}

export default GeneralSearchFilter;
