import { Classtype } from "./common";

export enum ReflectType {
    Void = 0,
    Int = 2,
    Float = 4,
    String = 8,
    Boolean = 16,
    Date = 32,
    Array = 64,
    Complex = 128
}

// tslint:disable-next-line:ban-types
export type ReflectTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | Classtype;



export class ReflectTypemeta {


    constructor(private option: {
        type: ReflectType,
        ref?: Classtype,
        name: string,
        isArray: boolean
    }) {

    }

    get type() {
        return this.option.type;
    }
    get ref() {
        return this.option.ref;
    }
    get name() {
        return this.option.name;
    }
    get isArray() {
        return this.option.isArray;
    }

    static Factory(type: ReflectTypes) {
        if (type) {
            if (type === String || type === "string") {
                return new ReflectTypemeta({
                    type: ReflectType.String,
                    ref: String,
                    name: "string",
                    isArray: false
                });
            }

            if (type === Number || type === "int") {
                return new ReflectTypemeta({
                    type: ReflectType.Int,
                    name: "int",
                    ref: Number,
                    isArray: false
                });
            }

            if (type === "float") {
                return new ReflectTypemeta({
                    type: ReflectType.Float,
                    name: "float",
                    ref: Number,
                    isArray: false
                });
            }



            if (type === Boolean || type === "boolean") {
                return new ReflectTypemeta({
                    type: ReflectType.Boolean,
                    name: "boolean",
                    ref: Boolean,
                    isArray: false
                });
            }
            if (type === Date || type === "date") {
                return new ReflectTypemeta({
                    type: ReflectType.Date,
                    name: "date",
                    ref: Date,
                    isArray: false
                });
            }

            return new ReflectTypemeta({
                type: ReflectType.Complex,
                name: type.name,
                ref: type,
                isArray: false
            });
        }

        return new ReflectTypemeta({
            type: ReflectType.Void,
            name: "void",
            isArray: false
        });
    }
}