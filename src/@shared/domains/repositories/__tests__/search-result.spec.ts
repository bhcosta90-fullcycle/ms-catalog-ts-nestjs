import { SearchResult } from "../search-result";
import {EntityAbstract} from "../../entity.abstract";

class StubEntity extends EntityAbstract {
    constructor() {
        super({});
    }
}

describe("SearchResult Unit Tests", () => {
    test("constructor props", () => {
        let result = new SearchResult({
            items: ["entity1", "entity2"] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });

        result = new SearchResult({
            items: ["entity1", "entity2"] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });
    });

    it("should set to json true", () => {
        const items = [new StubEntity(),new StubEntity()];

        const result = new SearchResult({
            items,
            total: 2,
            current_page: 1,
            per_page: 2,
        });


        expect(result.toJSON(true)).toStrictEqual({
            items: [items[0].toJSON(), items[1].toJSON()],
            total: 2,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    });

    it("should set last_page = 1 when per_page field is greater than total field", () => {
        const result = new SearchResult({
            items: [] as any,
            total: 4,
            current_page: 1,
            per_page: 15,
        });

        expect(result.last_page).toBe(1);
    });

    test("last_page prop when total is not a multiple of per_page", () => {
        const result = new SearchResult({
            items: [] as any,
            total: 101,
            current_page: 1,
            per_page: 20,
        });

        expect(result.last_page).toBe(6);
    });
});