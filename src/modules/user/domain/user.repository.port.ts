import { RepositoryPort } from '@libs/ddd';
import { UserEntity } from './user.entity';


export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>;
}
