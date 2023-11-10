import {IRepository, ISearchableRepository} from "../../domains/repositories/repository-interface";
import {EntityInterface} from "../../domains/entity.interface";
import {ValueObjectAbstract} from "../../domains/vo/abstracts/value-object.abstract";
import {NotFoundError} from "../../domains/exceptions/not-found.error";
import {SearchParams, SortDirection} from "../../domains/repositories/search-params";
import {SearchResult} from "../../domains/repositories/search-result";

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

export abstract class InMemorySearchRepository<E extends EntityInterface, EntityId extends ValueObjectAbstract, Filter = string> extends InMemoryRepository<E, EntityId> implements ISearchableRepository<E, EntityId, Filter>{
    sortableFields: string[];

    async search(props: SearchParams<Filter>): Promise<SearchResult> {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);

        const itemsSorted = this.applySort(
            itemsFiltered,
            props.sort,
            props.sort_dir
        );

        const itemsPaginated = this.applyPaginate(
            itemsSorted,
            props.page,
            props.per_page
        );

        return new SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
        });
    }

    protected abstract applyFilter(
        items: E[],
        filter: Filter | null
    ): Promise<E[]>;

    protected applyPaginate(
        items: E[],
        page: SearchParams["page"],
        per_page: SearchParams["per_page"]
    ) {
        const start = (page - 1) * per_page; // 0 * 15 = 0
        const limit = start + per_page; // 0 + 15 = 15
        return items.slice(start, limit);
    }

    protected applySort(
        items: E[],
        sort: string | null,
        sort_dir: SortDirection | null,
        custom_getter?: (sort: string, item: E) => any
    ) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }

        return [...items].sort((a, b) => {
            //@ts-ignore
            const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
            //@ts-ignore
            const bValue = custom_getter ? custom_getter(sort, b) : b[sort];
            if (aValue < bValue) {
                return sort_dir === "asc" ? -1 : 1;
            }

            if (aValue > bValue) {
                return sort_dir === "asc" ? 1 : -1;
            }

            return 0;
        });
    }
}