import { ClassType } from "../common";
import { IMeta } from "./meta";
export declare enum VariableType {
    /**
     * Propery type int, long , string, bool, float, double, date
     */
    Primitive = 1,
    Complex = 2
}
export declare enum VariablePrimitiveType {
    Void = 1,
    Int = 2,
    Float = 3,
    String = 4,
    Symbol = 5,
    Boolean = 6,
    Date = 7
}
export declare type VariableTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "symbol" | SymbolConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | ClassType;
export interface IVariableMeta extends IMeta {
    Type: VariableType;
    Refrence: VariablePrimitiveType | ClassType;
}
export declare class VariableMeta implements IVariableMeta {
    Level: number;
    Type: VariableType;
    Refrence: VariablePrimitiveType | ClassType;
    constructor(type: VariableType, ref: VariablePrimitiveType | ClassType);
    eq(o: VariableMeta): boolean;
}
