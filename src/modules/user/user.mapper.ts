import { Mapper } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/user.entity';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { UserModel } from '@modules/user/infra/user.model';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
    toDomain(record: UserModel): UserEntity {
        const entity = new UserEntity({
            id: record.id,
            createdAt: new Date(record.createdAt),
            updatedAt: new Date(record.updatedAt),
            props: {
                email: new Email({
                    address: record.email
                }),
            },
        });
        return entity;
    }

    toPersistence(entity: UserEntity): UserModel {
        const { email, id, createdAt, updatedAt } = entity.getProps();
        const record: UserModel = {
            id,
            createdAt,
            updatedAt,
            email: email.address,
        };

        return record;
    }

    toResponse(entity: UserEntity): UserResponseDto {
        const { email } = entity.getProps();
        const response = new UserResponseDto(entity);
        response.email = email.address;

        return response;
    }

}