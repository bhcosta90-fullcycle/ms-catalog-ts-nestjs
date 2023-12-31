import {UniqueId} from "./vo/unique-id.vo";

export interface EntityInterface<Props = any> {
    get id(): UniqueId;

    toJSON(): Required<{ id: UniqueId } & Props>
}