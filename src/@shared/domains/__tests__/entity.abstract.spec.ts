import {EntityAbstract} from "../entity.abstract";
import { validate as uuidValidate } from "uuid";
import {UniqueId} from "../vo/unique-id.vo";

class StubEntity extends EntityAbstract<{ prop1: string; prop2: number }> {
    constructor(props: {prop1: string; prop2: number}) {
        super(props);
    }
}

describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const entity = new StubEntity(arrange);
        expect(entity['props']).toStrictEqual(arrange);
        expect(entity['_id']).toBeInstanceOf(UniqueId);
        expect(uuidValidate(entity.id.toString())).toBeTruthy();
    });

    it("should convert an entity to a JavaScript Object", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id.toString(),
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            ...arrange,
        });
    });
});