import { ClassType } from "../common";
import { IMeta } from "./meta";

export enum VariableType {
    /**
     * Propery type int, long , string, bool, float, double, date
     */
    Primitive = 1,
    Complex = 2
}
export enum VariablePrimitiveType {
    Void = 1,

    Int, Float,
    String,
    Symbol,
    Boolean,

    Date
}

// tslint:disable-next-line:ban-types
export type VariableTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "symbol" | SymbolConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | ClassType;

export interface IVariableMeta extends IMeta {
    Type: VariableType;
    Refrence: VariablePrimitiveType | ClassType;
}
export class VariableMeta implements IVariableMeta {
    Level: number = 0;
    Type: VariableType;
    Refrence: VariablePrimitiveType | ClassType;

    constructor(type: VariableType, ref: VariablePrimitiveType | ClassType) {
        this.Type = type;
        this.Refrence = ref;
    }

    eq(o: VariableMeta) {
        return o.Type === this.Type && o.Refrence === this.Refrence;
    }

    typeName() {
        if (this.Type === VariableType.Primitive) {
            switch (this.Refrence) {
                case VariablePrimitiveType.Boolean:
                    return "boolean";
                case VariablePrimitiveType.Date:
                    return "date";
                case VariablePrimitiveType.Float:
                    return "float";
                case VariablePrimitiveType.Int:
                    return "int";
                case VariablePrimitiveType.String:
                    return "string";
                case VariablePrimitiveType.Symbol:
                    return "symbol";
                case VariablePrimitiveType.Void:
                    return "void";
            }
            return "null";
        }

        return (this.Refrence as ClassType).name;
    }

    toString() {
        return `VariableMeta(${this.Type === VariableType.Primitive ? "Primitive" : "Complex"}, ${this.typeName()}, ${this.Level})`;
    }
}