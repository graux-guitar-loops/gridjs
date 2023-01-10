import { PipelineProcessor, PipelineProcessorProps, ProcessorType } from '../processor';
import { ServerStorageOptions } from '../../storage/server';
interface ServerBoundedSearchFilterProps extends PipelineProcessorProps {
    lowerBound?: number;
    upperBound?: number;
    url?: (prevUrl: string, lowerBound: number, upperBound: number) => string;
    body?: (prevBody: BodyInit, lowerBound: number, upperBound: number) => BodyInit;
}
declare class ServerBoundedSearchFilter extends PipelineProcessor<ServerStorageOptions, ServerBoundedSearchFilterProps> {
    get type(): ProcessorType;
    _process(options?: ServerStorageOptions): ServerStorageOptions;
}
export default ServerBoundedSearchFilter;
