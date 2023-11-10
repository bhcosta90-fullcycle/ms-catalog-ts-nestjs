import {EntityInterface} from "./entity.interface";
import {randomUUID} from 'crypto'
import {UniqueId} from "../vo/unique-id.vo";

export abstract class EntityAbstract<PropsConstructor = any> implements EntityInterface<PropsConstructor> {
    protected _id: UniqueId;
    protected _created_at: Date;
    protected _updated_at: Date;

    protected constructor(protected readonly props: PropsConstructor & EntityAbstractType) {
        this._id = this.props.id ?? new UniqueId();
        this._created_at = this.props.created_at ?? new Date();
        this._updated_at = this.props.updated_at ?? new Date();
    }

    get id(): string {
        return this._id.toString();
    }

    get created_at(): Date {
        return this._created_at
    }

    get updated_at(): Date {
        return this._updated_at
    }

    toJSON(): Required<{ id: UniqueId, created_at: string, updated_at: string } & PropsConstructor> {
        return {
            id: this.id.toString(),
            ...this.props
        } as Required<{ id: UniqueId, created_at: string, updated_at: string } & PropsConstructor>
    }

}

export type EntityAbstractType = {
    id?: UniqueId | null;
    created_at?: Date | null;
    updated_at?: Date | null;
};