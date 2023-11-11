import {NotFoundError} from "./not-found.error";
import {EntityAbstract} from "../entity.abstract";

class StubEntity extends EntityAbstract {
    constructor() {
        super({});
    }
}

describe('NotFoundError Unit Test', () => {
    test("Testing with unique id", () => {
        expect(() => {
            throw new NotFoundError("testing", StubEntity)
        }).toThrow("StubEntity Not Found using ID testing");
    })

    test("Testing with multiple id", () => {
        expect(() => {
            throw new NotFoundError(["visible", "testing"], StubEntity)
        }).toThrow("StubEntity Not Found using ID visible, testing");
    })
});