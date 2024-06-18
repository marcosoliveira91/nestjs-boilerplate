
export interface ResponseBaseProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}


export class ResponseBase {
    constructor({ id, createdAt, updatedAt }: ResponseBaseProps) {
        this.id = id;
        this.createdAt = new Date(createdAt).toISOString();
        this.updatedAt = new Date(updatedAt).toISOString();
    }

    /**
     * Resource identifier.
     * @example 'e4360762-61a9-458f-80fe-fcb762492efa'
     */
    readonly id: string;


    /** 
    * Resource creation date in ISO format.
    * @example '2020-11-24T17:43:15.970Z'
    */
    readonly createdAt: string;


    /** 
     * Resource last update date in ISO format.
     * @example '2020-11-24T17:43:15.970Z'
     */
    readonly updatedAt: string;
}
