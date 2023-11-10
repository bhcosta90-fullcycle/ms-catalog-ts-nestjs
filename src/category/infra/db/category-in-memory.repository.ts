import {InMemoryRepository} from "../../../@shared/infra/db/in-memory.repository";
import {Category} from "../../domain/category.entity";
import {UniqueId} from "../../../@shared/domains/vo/unique-id.vo";

export class CategoryInMemoryRepository extends InMemoryRepository<Category, UniqueId> {
    getEntity(): new(...args: any[]) => Category {
        return Category;
    }
}