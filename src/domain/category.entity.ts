import {randomUUID} from 'crypto'

export type CategoryProps = {
    id?: string | null;
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;
}

export type CategoryCreateCommand = Pick<CategoryProps, "name" | "description" | "is_active">

export class Category {
    public id?: string | null;
    public name: string;
    public description?: string | null;
    public is_active: boolean;
    public created_at: Date;

    constructor(props: CategoryProps){
        this.id = props.id ?? randomUUID();
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.created_at = props.created_at ?? new Date();
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