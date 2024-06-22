import {
    Body,
    ConflictException as ConflictHttpException,
    Controller,
    Post
} from '@nestjs/common';

import { routes } from '@configs/app.routes';
import { ResourceIdentifier } from '@libs/api/identifier.response.dto';
import { AggregateID } from '@libs/ddd';
import { UserAlreadyExistsError } from '@modules/user/user.errors';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';

@Controller(routes.version)
export class CreateUserHttpController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post(routes.users.root)
    async create(@Body() body: CreateUserRequestDto): Promise<ResourceIdentifier> {
        const command = new CreateUserCommand(body);
        const result: Result<AggregateID, UserAlreadyExistsError> = await this.commandBus.execute(command);

        return match(result, {
            Ok: (id: string) => ({ id }),
            Err: (error: Error) => {
                if (error instanceof UserAlreadyExistsError) {
                    throw new ConflictHttpException(error.message);
                }

                throw error;
            },
        });
    }
}