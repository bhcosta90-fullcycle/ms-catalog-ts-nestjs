import {Category} from "../category.entity";

describe("Category Unit Test", () => {
    let $category: Category;

    beforeEach(() => {
        $category = Category.create({name: 'testing'});
    })

    test("Checking if you have the id and created_at assigned", () => {
        expect($category.id).not.toBeNull();
        expect($category.created_at).toBeInstanceOf(Date)
        expect($category.update_at).toBeInstanceOf(Date)
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
