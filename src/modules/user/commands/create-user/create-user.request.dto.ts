
import {
    IsEmail,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateUserRequestDto {
    /**
     * User email address.
     * @example 'aureliano.buendia@macondo.com'
     */
    @MaxLength(254)
    @MinLength(6)
    @IsEmail()
    readonly email: string;
}