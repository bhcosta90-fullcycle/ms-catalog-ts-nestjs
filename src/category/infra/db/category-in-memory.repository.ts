import {InMemoryRepository, InMemorySearchRepository} from "../../../@shared/infra/db/in-memory.repository";
import {Category} from "../../domain/category.entity";
import {UniqueId} from "../../../@shared/domains/vo/unique-id.vo";
import {SortDirection} from "../../../@shared/domains/repositories/search-params";

export class CategoryInMemoryRepository extends InMemorySearchRepository<Category, UniqueId> {
    sortableFields: string[] = ["name", "created_at"];

    getEntity(): new(...args: any[]) => Category {
        return Category;
    }

    protected async applyFilter(items: Category[], filter: string | null): Promise<Category[]> {
        if (!filter) {
            return items;
        }

        return items.filter((i) => {
            return i.name.toLowerCase().includes(filter.toLowerCase());
        });
    }

    protected applySort(
        items: Category[],
        sort: string | null,
        sort_dir: SortDirection | null
    ) {
        return sort
            ? super.applySort(items, sort, sort_dir)
            : super.applySort(items, "created_at", "desc");
    }
}