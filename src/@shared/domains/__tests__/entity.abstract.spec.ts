import {EntityAbstract} from "../entity.abstract";

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
    });

    it("should convert an entity to a JavaScript Object", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        });
    });
});