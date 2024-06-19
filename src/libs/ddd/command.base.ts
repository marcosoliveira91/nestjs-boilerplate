import { RequestContextService } from '@libs/context/request-context.service';
import { ArgumentNotProvidedException } from '@libs/exceptions';
import { Guard } from '@libs/guard';
import { randomUUID } from 'crypto';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

type CommandMetadata = {
  /** 
   * Correlation ID used for tracking the command
   * across multiple services and components, helping to correlate logs and traces.
   */
  readonly correlationId: string;

  /**
   * Causation ID used to track the execution order if needed, 
   * helping to understand sequence and dependencies of operations.
   */
  readonly causationId?: string;

  /**  Time when the command occurred. */
  readonly timestamp: number;
};

export class Command {
  readonly id: string;
  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Command props should not be empty');
    }

    this.id = props.id || randomUUID();
    this.metadata = {
      correlationId: props?.metadata?.correlationId || RequestContextService.getContext().requestId,
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }
}
