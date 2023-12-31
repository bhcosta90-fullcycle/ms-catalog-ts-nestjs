import {FieldsErrors} from "../../domains/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldsErrors) => R;
        }
    }
}
