import {v4 as uuid, validate as validateUuid} from "uuid";
import {ValueObjectAbstract} from "./abstracts/value-object.abstract";

export class UniqueId extends ValueObjectAbstract {
    protected _id: string;

    constructor(id?: string) {
        super(id ?? uuid());
        this.validate();
    }

    private validate() {
        if (!validateUuid(this.value)) {
            throw new Error("ID must be a valid UUID");
        }
    }
}