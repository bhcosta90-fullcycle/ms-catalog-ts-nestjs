import {Category} from "../category.entity";
import {UniqueId} from "../../@shared/domains/vo/unique-id.vo";

describe("Category Unit Test", () => {
    describe("Constructor", () => {
        let $category: Category;
        let $validateSpy: any;

        beforeEach(() => {
            $validateSpy = jest.spyOn(Category, "validate");

            $category = Category.create({name: 'testing'});
            expect($validateSpy).toHaveBeenCalledTimes(1)
        })

        test("Checking if you have the id and created_at assigned", () => {
            expect($category.id).not.toBeNull();
            expect($category.id).toBeInstanceOf(UniqueId);
            expect($category.created_at).toBeInstanceOf(Date)
            expect($category.updated_at).toBeInstanceOf(Date)
            expect($category.is_active).toBeTruthy();
            expect($category.description).toBeNull();
        })

        test("Change name field in to category", () => {
            expect($category.name).toBe("testing");
            $category.changeName('testing 2');
            expect($validateSpy).toHaveBeenCalledTimes(2)
            expect($category.name).toBe("testing 2");
        })

        test("Change description field in to category", () => {
            expect($category.description).toBe(null);
            $category.changeDescription('testing');
            expect($validateSpy).toHaveBeenCalledTimes(2)
            expect($category.description).toBe("testing");
        })

        describe("Field is_active", function(){
            test("Change field is_active to true", function(){
                const $category: Category = Category.create({name: 'testing', is_active: false});
                expect($category.is_active).toBeFalsy();
                $category.enable()
                expect($validateSpy).toHaveBeenCalledTimes(2)
                expect($category.is_active).toBeTruthy();
            })

            test("Change field is_active to false", function(){
                $category.disable()
                expect($category.is_active).toBeFalsy();
            })

            test("Change name and description with method update", () => {
                $category.update({name: 'testing update', description: 'testing description update'});
                expect($category.name).toBe('testing update');
                expect($category.description).toBe('testing description update');
            })
        })
    })

    describe("Making", () => {
        test("Creating a new category passing all fields", () => {
            const arrange = {
                description: 'testing',
                name: 'testing',
                is_active: false,
                id: '1495f958-7fda-11ee-b962-0242ac120002',
                created_at: '2020-01-01 00:00:00',
                updated_at: '2020-01-02 00:00:00',
            };

            const $category: Category = new Category(arrange);
            expect($category.toJSON()).toStrictEqual(arrange);
        })
    });
})

describe("Category Validator Unit Test", () => {
    test('should an invalid category with name property', () => {
        expect(() => Category.create({
            name: null,
        })).containsErrorMessages({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });

        expect(() => Category.create({ name: "" })).containsErrorMessages({
            name: ["name should not be empty"],
        });

        expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
            name: [
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });

        expect(() =>
            Category.create({ name: "t".repeat(256) })
        ).containsErrorMessages({
            name: ["name must be shorter than or equal to 255 characters"],
        });
    });

    test('should an invalid category with description property', () => {
        expect(() =>
            Category.create({ description: 5 } as any)
        ).containsErrorMessages({
            description: [
                "description must be a string",
                "description must be shorter than or equal to 10000 characters"
            ],
        });

        expect(() =>
            Category.create({ description: "t".repeat(10001) } as any)
        ).containsErrorMessages({
            description: ["description must be shorter than or equal to 10000 characters"],
        });
    });

    test("should a invalid category using is_active property", () => {
        expect(() =>
            Category.create({ is_active: 5 } as any)
        ).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });
    });

    describe("changeName method", () => {
        it("should a invalid category using name property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeName(null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("")).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.changeName(5 as any)).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("t".repeat(256))).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });
    });

    describe("changeDescription method", () => {
        it("should a invalid category using description property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeDescription(5 as any)).containsErrorMessages({
                description: [
                    "description must be a string",
                    "description must be shorter than or equal to 10000 characters"
                ],
            });

            expect(() => category.changeDescription("t".repeat(10001))).containsErrorMessages({
                description: [
                    "description must be shorter than or equal to 10000 characters"
                ],
            });
        });
    });
})