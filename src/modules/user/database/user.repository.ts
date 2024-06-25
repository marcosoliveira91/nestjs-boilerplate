import { DB_CONNECTION } from '@libs/db/database.module';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../domain/user.entity';
import { UserMapper } from '../user.mapper';
import { UserModel } from './user.model';
import { UserRepositoryPort } from './user.repository.port';


@Injectable()
export class UserRepository extends SqlRepositoryBase<UserEntity, UserModel> implements UserRepositoryPort {

  protected tableName = 'users';

  constructor(
    @Inject(DB_CONNECTION) dbConnection: EntityManager,
    mapper: UserMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(dbConnection, mapper, eventEmitter, new Logger(UserRepository.name));
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ email });
    if (!user) return null;

    return this.mapper.toDomain(user);
  }
}
