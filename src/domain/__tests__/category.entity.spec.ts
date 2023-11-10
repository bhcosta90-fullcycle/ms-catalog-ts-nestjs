import {Category} from "../category.entity";
import {UniqueId} from "../../@shared/vo/unique-id.vo";

describe("Category Unit Test", () => {
    describe("Constructor", () => {
        let $category: Category;

        beforeEach(() => {
            $category = Category.create({name: 'testing'});
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
            expect($category.name).toBe("testing 2");
        })

        test("Change description field in to category", () => {
            expect($category.description).toBe(null);
            $category.changeDescription('testing');
            expect($category.description).toBe("testing");
        })

        describe("Field is_active", function(){
            test("Change field is_active to true", function(){
                const $category: Category = Category.create({name: 'testing', is_active: false});
                expect($category.is_active).toBeFalsy();
                $category.enable()
                expect($category.is_active).toBeTruthy();
            })

            test("Change field is_active to false", function(){
                $category.disable()
                expect($category.is_active).toBeFalsy();
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
