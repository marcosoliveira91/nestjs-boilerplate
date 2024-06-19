import { ArgumentInvalidException, ArgumentNotProvidedException } from "@libs/exceptions";
import { Guard } from "@libs/guard";

export type AggregateID = string;

export interface BaseEntityProps {
    id: AggregateID;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateEntityProps<T> {
    id: AggregateID;
    props: T;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
    constructor({
        id,
        createdAt,
        updatedAt,
        props,
    }: CreateEntityProps<EntityProps>) {
        this.setId(id);
        this.validateProps(props);
        const now = new Date();
        this._createdAt = createdAt ?? now;
        this._updatedAt = updatedAt ?? now;
        this.props = props;
        this.validate();
    }

    protected readonly props: EntityProps;
    protected abstract _id: AggregateID;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    get id(): AggregateID {
        return this._id;
    }

    private setId(id: AggregateID): void {
        this._id = id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    static isEntity(entity: unknown): entity is Entity<unknown> {
        return entity instanceof Entity;
    }

    /**
     *  Checks if two entities are the same.
     */
    public equals(object?: Entity<EntityProps>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (!Entity.isEntity(object)) {
            return false;
        }

        if (this === object) {
            return true;
        }


        return this.id ? this.id === object.id : false;
    }


    /**
     * Returns all entity properties.
     */
    public getProps(): EntityProps & BaseEntityProps {
        const propsCopy = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...this.props,
        };
        return Object.freeze(propsCopy);
    }

    /**
     * Validates entity-specific rules (invariants) before saving to the database.
     */
    public abstract validate(): void;

    private validateProps(props: EntityProps): void {
        if (Guard.isEmpty(props)) {
            throw new ArgumentNotProvidedException(
                'Entity props should not be empty',
            );
        }
        if (typeof props !== 'object') {
            throw new ArgumentInvalidException('Entity props should be an object');
        }
    }
}
