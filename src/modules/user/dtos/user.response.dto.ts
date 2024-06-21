import { ResponseBase } from "@libs/api/response.dto";

export class UserResponseDto extends ResponseBase {

    /**
     *  User's email address.
     *  @example: 'aureliano.buendia@macondo.com',
     */
    email: string;
}
