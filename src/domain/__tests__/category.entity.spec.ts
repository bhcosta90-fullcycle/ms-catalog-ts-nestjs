import {Category} from "../category.entity";

describe("Category Unit Test", () => {
    test("Checking if you have the id and created_at assigned", () => {
        const $category: Category = Category.create({name: 'testing'});
        expect($category.id).not.toBeNull();
        expect($category.created_at).toBeInstanceOf(Date)
        expect($category.is_active).toBeTruthy();
        expect($category.description).toBeNull();
    })

    test("Change name field in to category", () => {
        const $category: Category = Category.create({name: 'testing'});
        expect($category.name).toBe("testing");
        $category.changeName('testing 2');
        expect($category.name).toBe("testing 2");
    })

    test("Change description field in to category", () => {
        const $category: Category = Category.create({name: 'testing'});
        expect($category.description).toBe(null);
        $category.changeDescription('testing');
        expect($category.description).toBe("testing");
    })

    describe("Testing field is_active", function(){
        test("change field is_active to true", function(){
            const $category: Category = Category.create({name: 'testing', is_active: false});
            expect($category.is_active).toBeFalsy();
            $category.enable()
            expect($category.is_active).toBeTruthy();
        })

        test("change field is_active to false", function(){
            const $category: Category = Category.create({name: 'testing'});
            $category.disable()
            expect($category.is_active).toBeFalsy();
        })
    })
})
