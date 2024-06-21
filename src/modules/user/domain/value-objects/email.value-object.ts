import { ValueObject } from "@libs/ddd";
import { ArgumentInvalidException } from "@libs/exceptions";
import { Guard } from "@libs/guard";

export interface EmailProps {
    address: string;
}

export class Email extends ValueObject<EmailProps> {
    get address(): string {
        return this.props.address;
    }

    get domain(): string {
        return this.props.address.split('@')[1];
    }

    protected validate({ address }: EmailProps): void {
        if (Guard.isEmpty(address) || address.length < 5) {
            throw new ArgumentInvalidException('Email address is invalid');
        }

        const addressTrimmed = address.toLowerCase().trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!addressTrimmed.match(pattern)) {
            throw new ArgumentInvalidException('Email address is invalid');
        }
    }
}
