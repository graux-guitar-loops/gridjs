import {
  PipelineProcessor,
  PipelineProcessorProps,
  ProcessorType,
} from '../processor';
import { ServerStorageOptions } from '../../storage/server';
import { TCell } from '../../types';

interface ServerGeneralSearchFilterProps extends PipelineProcessorProps {
  keywords?: string[];
  filterFunction?: (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean;
  url?: (prevUrl: string, keywords: string[], filterFunction : (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean) => string;
  body?: (prevBody: BodyInit, keywords: string[], filterFunction : (cell: TCell, rowIndex: number, cellIndex: number, keywords: string[], data: string) => boolean) => BodyInit;
}

class ServerGeneralSearchFilter extends PipelineProcessor<
  ServerStorageOptions,
  ServerGeneralSearchFilterProps
> {
  get type(): ProcessorType {
    return ProcessorType.ServerFilter;
  }

  _process(options?: ServerStorageOptions): ServerStorageOptions {
    if (!this.props.keywords) { return options };

    const updates = {};

    if (this.props.url) {
      updates['url'] = this.props.url(options.url, this.props.keywords, this.props.filterFunction);
    }

    if (this.props.body) {
      updates['body'] = this.props.body(options.body, this.props.keywords, this.props.filterFunction);
    }

    return {
      ...options,
      ...updates,
    };
  }
}


export default ServerGeneralSearchFilter;
