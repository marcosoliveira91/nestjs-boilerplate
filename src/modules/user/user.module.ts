import { UserRepository } from "@modules/user/infra/user.repository";
import { USER_REPOSITORY } from "@modules/user/user.di-tokens";
import { UserMapper } from "@modules/user/user.mapper";
import { Logger, Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

const httpControllers = [];
const messageControllers = [];
const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];
const mappers: Provider[] = [UserMapper];
const repositories: Provider[] = [
    { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
    imports: [CqrsModule],
    controllers: [...httpControllers, ...messageControllers],
    providers: [
        Logger,
        ...repositories,
        ...commandHandlers,
        ...queryHandlers,
        ...mappers,
    ],
})
export class UserModule { }