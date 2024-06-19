import { Entity } from './entity.base';

export interface Mapper<DomainEntity extends Entity<any>, PersistenceRecord, Response = any> {
    toDomain(record: any): DomainEntity;
    toPersistence(entity: DomainEntity): PersistenceRecord;
    toResponse(entity: DomainEntity): Response;
}
