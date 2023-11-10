import {randomUUID} from 'crypto'
import {EntityAbstract} from "../@shared/domains/entity.abstract";

export type CategoryProps = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export type CategoryCreateCommand = Pick<CategoryProps, "name" | "description" | "is_active">

export class Category extends EntityAbstract<CategoryProps>{
    public name: string;
    public description?: string | null;
    public is_active: boolean;

    constructor(props: CategoryProps) {
        super(props);

        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
    }

    static create(props: CategoryCreateCommand) {
        return new Category(props);
    }

    changeName(name: string): this {
        this.name = name;
        return this;
    }


    changeDescription(description: string): this {
        this.description = description;
        return this;
    }

    enable(): this {
        this.is_active = true;
        return this;
    }


    disable(): this {
        this.is_active = false;
        return this;
    }
}