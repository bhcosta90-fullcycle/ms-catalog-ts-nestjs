import {EntityAbstract} from "../entity.abstract";

type StubEntityType = { prop1: string; prop2: number };

class StubEntity extends EntityAbstract<StubEntityType> {
    constructor(props: StubEntityType) {
        super(props);
    }
}

describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange: StubEntityType = {prop1: "prop1 value", prop2: 10};
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