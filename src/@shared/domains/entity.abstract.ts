import {EntityInterface} from "./entity.interface";
import {randomUUID} from 'crypto'

export abstract class EntityAbstract<PropsConstructor = any> implements EntityInterface<PropsConstructor> {
    protected _id: string;
    protected _created_at: Date;
    protected _update_at: Date;

    protected constructor(protected readonly props: PropsConstructor & EntityAbstractType) {
        this._id = this.props.id ?? randomUUID().toString();
        this._created_at = this.props.created_at ?? new Date();
        this._update_at = this.props.update_at ?? new Date();
    }

    get id(): string {
        return this._id;
    }

    get created_at(): Date {
        return this._created_at
    }

    get update_at(): Date {
        return this._update_at
    }

    toJSON(): Required<{ id: string } & PropsConstructor> {
        return {
            id: this.id,
            ...this.props
        } as Required<{ id: string } & PropsConstructor>
    }

}

export type EntityAbstractType = {
    id?: string | null;
    created_at?: Date | null;
    update_at?: Date | null;
};