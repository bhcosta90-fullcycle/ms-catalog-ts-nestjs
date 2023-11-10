import {IRepository} from "../@shared/domains/repositories/repository-interface";
import {Category} from "./category.entity";
import {UniqueId} from "../@shared/domains/vo/unique-id.vo";

export interface CategoryRepositoryInterface extends IRepository<Category, UniqueId> {

}