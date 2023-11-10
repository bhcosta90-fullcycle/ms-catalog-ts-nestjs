import {EntityAbstract, EntityProps} from "../@shared/domains/entity.abstract";
import {CategoryValidatorFactory} from "./category.validator";
import {EntityValidationError} from "../@shared/domains/validators/validation.error";

export type CategoryProps = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export class Category extends EntityAbstract<CategoryProps>{
    private _name: string;
    private _description?: string | null;
    private _is_active: boolean;

    constructor(props: CategoryProps & EntityProps) {
        super(props);

        this._name = props.name;
        this._description = props.description ?? null;
        this._is_active = props.is_active ?? true;
    }

    static create(props: CategoryProps) {
        const category = new Category(props);
        Category.validate(category);
        return category;
    }

    changeName(name: string): this {
        this._name = name;
        Category.validate(this)
        return this;
    }


    changeDescription(description: string): this {
        this._description = description;
        Category.validate(this)
        return this;
    }

    enable(): this {
        this._is_active = true;
        return this;
    }


    disable(): this {
        this._is_active = false;
        return this;
    }

    get name(): string {
        return this._name;
    }

    get description(): string | null {
        return this._description;
    }

    get is_active(): boolean {
        return this._is_active;
    }

    static validate(entity: Category) {
        const validator = CategoryValidatorFactory.create()
        const isValid = validator.validate(entity)

        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }
}