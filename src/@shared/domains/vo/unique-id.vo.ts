import {v4 as uuid, validate as validateUuid} from "uuid";
import {ValueObjectAbstract} from "./abstracts/value-object.abstract";

export class UniqueId extends ValueObjectAbstract {
    constructor(id?: string) {
        super(id ?? uuid());
        this.validate();
    }

    private validate() {
        if (!validateUuid(this.value.toString())) {
            throw new InvalidUuidError("ID", this.value);
        }
    }
}

export class InvalidUuidError extends Error {
    constructor(field: string, value: string) {
        super(`${field} must be a valid UUID and was sent ${value}`);
        this.name = "InvalidUuidError";
    }
}
