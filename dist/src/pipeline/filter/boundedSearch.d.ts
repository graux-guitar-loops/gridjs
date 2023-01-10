import Tabular from '../../tabular';
import { PipelineProcessor, PipelineProcessorProps, ProcessorType } from '../processor';
import { OneDArray, TCell, TColumn } from '../../types';
interface BoundedSearchFilterProps extends PipelineProcessorProps {
    lowerBound: number;
    upperBound: number;
    columns: OneDArray<TColumn>;
    ignoreHiddenColumns: boolean;
    selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
}
declare class BoundedSearchFilter extends PipelineProcessor<Tabular, BoundedSearchFilterProps> {
    get type(): ProcessorType;
    _process(data: Tabular): Tabular;
}
export default BoundedSearchFilter;
