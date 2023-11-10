import {EntityInterface} from "../entity.interface";
import {ValueObjectAbstract} from "../vo/abstracts/value-object.abstract";

export interface IRepository<E extends EntityInterface, EntityId extends ValueObjectAbstract> {
    insert(entity: E): Promise<void>

    bulkInsert(entities: E[]): Promise<void>

    update(entity: E): Promise<void>

    delete(id: EntityId): Promise<void>

    findById(id: EntityId): Promise<E>

    findAll(): Promise<E[]>

    getEntity(): new (...args: any[]) => E
}