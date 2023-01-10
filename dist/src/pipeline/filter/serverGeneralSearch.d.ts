import { PipelineProcessor, PipelineProcessorProps, ProcessorType } from '../processor';
import { ServerStorageOptions } from '../../storage/server';
import { TCell } from '../../types';
interface ServerGeneralSearchFilterProps extends PipelineProcessorProps {
    keywords?: string[];
    filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
    url?: (prevUrl: string, keywords: string[], filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean) => string;
    body?: (prevBody: BodyInit, keywords: string[], filterFunction: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean) => BodyInit;
}
declare class ServerGeneralSearchFilter extends PipelineProcessor<ServerStorageOptions, ServerGeneralSearchFilterProps> {
    get type(): ProcessorType;
    _process(options?: ServerStorageOptions): ServerStorageOptions;
}
export default ServerGeneralSearchFilter;
