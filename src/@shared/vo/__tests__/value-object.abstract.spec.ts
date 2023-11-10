import { ValueObjectAbstract } from '../value-object.abstract';

describe("ValueObject Unit Test", () => {
    it("should set value", () => {
        let vo = new StubValueObjectAbstract("test");
        expect(vo.value).toBe("test");

        vo = new StubValueObjectAbstract({ prop1: 'test' });
        expect(vo.value).toStrictEqual({ prop1: 'test' })
    })

    it("should convert to a string", () => {
        const date = new Date();
        const arrange = [
            { received: "", expected: "" },
            { received: "fake test", expected: "fake test" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: undefined, expected: "undefined" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            {
                received: { prop1: "value1" },
                expected: JSON.stringify({ prop1: "value1" }),
            },
        ];

        arrange.forEach((value) => {
            const vo = new StubValueObjectAbstract(value.received);
            expect(vo + "").toBe(value.expected);
        });
    });

    it("should be a immutable object", () => {
        const obj = {
            prop1: "value1",
            deep: { prop2: "value2", prop3: new Date() },
        };
        const vo = new StubValueObjectAbstract(obj);

        expect(() => {
            (vo as any).value.prop1 = "test";
        }).toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );

        expect(() => {
            (vo as any).value.deep.prop2 = "test";
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    });
})

class StubValueObjectAbstract<Value = any> extends ValueObjectAbstract {
    constructor(value: Value) {
        super(value);
    }
}