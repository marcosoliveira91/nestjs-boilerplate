import { AggregateID } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { UserRepositoryPort } from '@modules/user/database/user.repository.port';
import { UserEntity } from '@modules/user/domain/user.entity';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { UserAlreadyExistsError } from '@modules/user/user.errors';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
    constructor(
        @Inject(USER_REPOSITORY) protected readonly userRepo: UserRepositoryPort,
    ) { }

    async execute(command: CreateUserCommand): Promise<Result<AggregateID, UserAlreadyExistsError>> {
        const user = UserEntity.create({
            email: new Email({ address: command.email }),
        });

        try {
            await this.userRepo.transaction(
                async () => this.userRepo.insert(user)
                /**
                 * NOTE: if UserRepository does not extends BaseRepository, 
                 *       we should publish the domain under the same transaction.
                 * 
                 * Eg.:
                 *    async () => {
                 *      await this.userRepo.insert(user);
                 *      await user.publishEvents(this.logger, this.eventEmitter);
                 *    }
                 */
            );

            return Ok(user.id);
        } catch (error: any) {
            if (error instanceof ConflictException) {
                return Err(new UserAlreadyExistsError(error));
            }
            throw error;
        }
    }
}