import { Command, CommandProps } from '@libs/ddd';

export class CreateUserCommand extends Command {
    readonly email: string;

    constructor(props: CommandProps<CreateUserCommand>) {
        super(props);
        this.email = props.email;
    }
}