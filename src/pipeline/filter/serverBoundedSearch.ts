import {
  PipelineProcessor,
  PipelineProcessorProps,
  ProcessorType,
} from '../processor';
import { ServerStorageOptions } from '../../storage/server';

interface ServerBoundedSearchFilterProps extends PipelineProcessorProps {
  lowerBound?: number;
  upperBound?: number;
  url?: (prevUrl: string, lowerBound : number, upperBound : number) => string;
  body?: (prevBody: BodyInit, lowerBound : number, upperBound : number) => BodyInit;
}

class ServerBoundedSearchFilter extends PipelineProcessor<
  ServerStorageOptions,
  ServerBoundedSearchFilterProps
> {
  get type(): ProcessorType {
    return ProcessorType.ServerFilter;
  }

  _process(options?: ServerStorageOptions): ServerStorageOptions {
    if (!this.props.lowerBound && !this.props.upperBound) { return options; }

    const updates = {};

    if (this.props.url) {
      updates['url'] = this.props.url(options.url, this.props.lowerBound, this.props.upperBound);
    }

    if (this.props.body) {
      updates['body'] = this.props.body(options.body, this.props.lowerBound, this.props.upperBound);
    }

    return {
      ...options,
      ...updates,
    };
  }
}

export default ServerBoundedSearchFilter;
