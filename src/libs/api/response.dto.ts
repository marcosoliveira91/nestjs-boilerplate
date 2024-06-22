import { ResourceIdentifier } from "@libs/api/identifier.response.dto";

export interface ResponseBaseProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ResponseBase extends ResourceIdentifier {
    constructor({ id, createdAt, updatedAt }: ResponseBaseProps) {
        super(id);
        this.createdAt = new Date(createdAt).toISOString();
        this.updatedAt = new Date(updatedAt).toISOString();
    }

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
