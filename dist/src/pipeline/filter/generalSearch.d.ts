import Tabular from '../../tabular';
import { PipelineProcessor, PipelineProcessorProps, ProcessorType } from '../processor';
import { OneDArray, TCell, TColumn } from '../../types';
interface GeneralSearchFilterProps extends PipelineProcessorProps {
    keywords: string[];
    columns: OneDArray<TColumn>;
    ignoreHiddenColumns: boolean;
    selector?: (cell: TCell, rowIndex: number, cellIndex: number) => string;
    filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
}
declare class GeneralSearchFilter extends PipelineProcessor<Tabular, GeneralSearchFilterProps> {
    get type(): ProcessorType;
    _process(data: Tabular): Tabular;
}
export default GeneralSearchFilter;
