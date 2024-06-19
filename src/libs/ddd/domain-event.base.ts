import { randomUUID } from 'crypto';
import { ArgumentNotProvidedException } from '../exceptions';
import { Guard } from '../guard';
import { RequestContextService } from '@libs/context/request-context.service';

type DomainEventMetadata = {
    /** 
     * Correlation ID used for tracking the domain event
     * across different services and components, helping to correlate logs and traces.
     */
    readonly correlationId: string;

    /**
     * Causation ID used to track the execution order if needed, 
     * helping to understand sequence and dependencies of operations.
     */
    readonly causationId?: string;

    /** Time when the event occured. */
    readonly timestamp: number;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
    aggregateId: string;
    metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
    public readonly id: string;

    /** Aggregate ID where domain event occurred */
    public readonly aggregateId: string;

    public readonly metadata: DomainEventMetadata;

    constructor(props: DomainEventProps<unknown>) {
        if (Guard.isEmpty(props)) {
            throw new ArgumentNotProvidedException('DomainEvent props should not be empty');
        }

        this.id = randomUUID();
        this.aggregateId = props.aggregateId;
        this.metadata = {
            correlationId: props?.metadata?.correlationId || RequestContextService.getRequestId(),
            causationId: props?.metadata?.causationId,
            timestamp: props?.metadata?.timestamp || Date.now(),
        };
    }
}
