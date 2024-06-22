export class ResourceIdentifier {
    constructor(identifier: string) {
        this.id = identifier;
    }

    /**
     * Resource identifier.
     * @example 'e4360762-61a9-458f-80fe-fcb762492efa'
     */
    readonly id: string;
}