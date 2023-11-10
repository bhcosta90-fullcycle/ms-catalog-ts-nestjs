import {randomUUID} from 'crypto'
import {EntityAbstract} from "../@shared/domains/entity.abstract";

export type CategoryProps = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export type CategoryCreateCommand = Pick<CategoryProps, "name" | "description" | "is_active">

export class Category extends EntityAbstract<CategoryProps>{
    private _name: string;
    private _description?: string | null;
    private _is_active: boolean;

    constructor(props: CategoryProps) {
        super(props);

        this._name = props.name;
        this._description = props.description ?? null;
        this._is_active = props.is_active ?? true;
    }

    static create(props: CategoryCreateCommand) {
        return new Category(props);
    }

    changeName(name: string): this {
        this._name = name;
        return this;
    }


    changeDescription(description: string): this {
        this._description = description;
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
}