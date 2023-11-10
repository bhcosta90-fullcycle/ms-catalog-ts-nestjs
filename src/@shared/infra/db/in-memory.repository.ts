import {IRepository} from "../../domains/repositories/repository-interface";
import {EntityInterface} from "../../domains/entity.interface";
import {ValueObjectAbstract} from "../../domains/vo/abstracts/value-object.abstract";
import {NotFoundError} from "../../domains/exceptions/not-found.error";

export abstract class InMemoryRepository<E extends EntityInterface, EntityId extends ValueObjectAbstract> implements IRepository<E, EntityId> {
    items: E[] = [];

    async bulkInsert(entities: E[]): Promise<void> {
        this.items.push(...entities);
    }

    async delete(id: EntityId): Promise<void> {
        const indexFound: number = this._getId(id);
        this.items.splice(indexFound, 1);
    }

    async findAll(): Promise<E[]> {
        return this.items
    }

    async findById(id: EntityId): Promise<E> {
        const indexFound = this._getId(id);
        return this.items[indexFound];
    }

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async update(entity: E): Promise<void> {
        const indexFound = this._getId(entity.id);
        this.items[indexFound] = entity
    }

    private _getId(id: ValueObjectAbstract): number {
        const indexFound: number = this.items.findIndex((item) => item.id.toString() == id.toString())
        if (indexFound === -1) {
            throw new NotFoundError(id, this.getEntity());
        }
        return indexFound;
    }

    abstract getEntity(): new (...args: any[]) => E;
}