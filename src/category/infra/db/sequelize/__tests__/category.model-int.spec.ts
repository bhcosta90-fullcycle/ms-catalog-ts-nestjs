import { DataType, Sequelize } from "sequelize-typescript";
import {setupSequelize} from "../../../../../@shared/infra/testing/helpers";
import {CategoryModel} from "../category.model";

describe("CategoryModel Integration Tests", () => {
    setupSequelize({ models: [CategoryModel] });

    test("mapping props", () => {
        const attributesMap = CategoryModel.getAttributes();
        const attributes = Object.keys(CategoryModel.getAttributes());

        expect(attributes).toStrictEqual([
            "id",
            "name",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]);

        const categoryIdAttr = attributesMap.id;
        expect(categoryIdAttr).toMatchObject({
            field: "id",
            fieldName: "id",
            primaryKey: true,
            type: DataType.UUID(),
        });

        const nameAttr = attributesMap.name;
        expect(nameAttr).toMatchObject({
            field: "name",
            fieldName: "name",
            allowNull: false,
            type: DataType.STRING(255),
        });

        const descriptionAttr = attributesMap.description;
        expect(descriptionAttr).toMatchObject({
            field: "description",
            fieldName: "description",
            allowNull: true,
            type: DataType.TEXT(),
        });

        const isActiveAttr = attributesMap.is_active;
        expect(isActiveAttr).toMatchObject({
            field: "is_active",
            fieldName: "is_active",
            allowNull: false,
            type: DataType.BOOLEAN(),
        });

        const createdAtAttr = attributesMap.created_at;
        expect(createdAtAttr).toMatchObject({
            field: "created_at",
            fieldName: "created_at",
            allowNull: false,
            type: DataType.DATE(3),
        });

        const updatedAtAttr = attributesMap.updated_at;
        expect(updatedAtAttr).toMatchObject({
            field: "updated_at",
            fieldName: "updated_at",
            allowNull: false,
            type: DataType.DATE(3),
        });
    });

    test("create", async () => {
        //arrange
        const arrange = {
            id: "9366b7dc-2d71-4799-b91c-c64adb205104",
            name: "test",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const category = await CategoryModel.create(arrange);

        expect(category.toJSON()).toStrictEqual(arrange);
        expect(category.created_at).toBeInstanceOf(Date)
    });
});