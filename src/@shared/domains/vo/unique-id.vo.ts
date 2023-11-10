import {v4 as uuid, validate as validateUuid} from "uuid";
import {ValueObjectAbstract} from "./abstracts/value-object.abstract";

export class UniqueId extends ValueObjectAbstract {
    constructor(id?: string) {
        super(id ?? uuid());
        this.validate();
    }

    private validate() {
        if (!validateUuid(this.value)) {
            throw new InvalidUuidError("ID");
        }
    }
}

export class InvalidUuidError extends Error {
    constructor(field: string) {
        super(`${field} must be a valid UUID`);
        this.name = "InvalidUuidError";
    }
}
