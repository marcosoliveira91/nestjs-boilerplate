import { Email } from "@modules/user/domain/value-objects/email.value-object";

export interface UserProps {
    email: Email;
}

export interface CreateUserProps {
    email: Email;
}

export interface UpdateUserEmailProps {
    email: Email;
}
