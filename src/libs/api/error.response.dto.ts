export class ErrorResponse {
    /**
     * HTTP status code indicating the type of error.
     * @example 400
     */
    readonly statusCode: number;

    /**
     * Human-readable message describing the error.
     * @example 'Validation Error'
     */
    readonly message: string;

    /**
    * Brief description or name of the error.
    * @example 'Bad Request'
    */
    readonly error: string;

    /**
     * Unique identifier for tracking the request
     * @example 'e4360762-61a9-458f-80fe-fcb762492efa'
     */
    readonly correlationId: string;

    /**
     * Additional details about the error.
     * @example ['incorrect email']
     */
    readonly details?: string[];

    constructor({ statusCode, message, error, correlationId, details }: ErrorResponse) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.correlationId = correlationId;
        this.details = details;
    }
}
