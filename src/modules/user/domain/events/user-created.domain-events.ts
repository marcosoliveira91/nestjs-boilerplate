import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { Email } from '@modules/user/domain/value-objects/email.value-object';

export class UserCreatedDomainEvent extends DomainEvent {
    readonly email: Email;

    constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
        super(props);
        this.email = props.email;
    }
}
