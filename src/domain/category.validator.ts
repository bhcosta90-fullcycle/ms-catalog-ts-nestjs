import {IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'
import {Category} from "./category.entity";
import {ClassValidatorFields} from "../@shared/domains/validators/class-validator-fields";

class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(10000)
    @IsString()
    @IsOptional()
    description: string | null;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    constructor({name, description, is_active}: Category) {
        Object.assign(this, {name, description, is_active});
    }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(data: Category): boolean {
        return super.validate(new CategoryRules(data));
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}