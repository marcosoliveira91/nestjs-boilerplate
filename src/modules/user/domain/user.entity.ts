import { AggregateID, AggregateRoot } from "@libs/ddd";
import { UserCreatedDomainEvent } from "@modules/user/domain/events/user-created.domain-events";
import { Email } from "@modules/user/domain/value-objects/email.value-object";
import { CreateUserProps, UpdateUserEmailProps, UserProps } from "@modules/user/user.types";
import { randomUUID } from "crypto";

export class UserEntity extends AggregateRoot<UserProps> {
    protected readonly _id: AggregateID;

    static create(props: CreateUserProps): UserEntity {
        const uuid = randomUUID();
        const user = new UserEntity({ id: uuid, props });

        user.addEvent(
            new UserCreatedDomainEvent({
                aggregateId: uuid,
                email: props.email,
            }),
        );
        return user;
    }

    updateEmail({ email }: UpdateUserEmailProps): void {
        const newEmail = new Email({ address: email.address });
        this.props.email = newEmail;

        /**
         * Sends a domain event to notify the change
         * this.addEvent(
         *    new UserEmailUpdatedDomainEvent({
         *       aggregateId: this.id,
         *      email: newEmail,
         *    }),
         * );
         */

    }

    validate(): void {
        // entity business rules validation to protect it's invariant before saving entity to a database
    }
}