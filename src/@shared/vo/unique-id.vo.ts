import {v4 as uuid, validate as validateUuid} from "uuid";
import {ValueObjectAbstract} from "./abstracts/value-object.abstract";

export class UniqueId extends ValueObjectAbstract {
    constructor(id?: string) {
        super(id ?? uuid());
        this.validate();
    }

    private validate() {
        if (!validateUuid(this.value)) {
            throw new InvalidUuidError("ID must be a valid UUID");
        }
    }
}

export class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || "ID must be a valida UUID");
        this.name = "InvalidUuidError";
    }
}
