import { ClassType } from "../common";
import { IMeta } from "./meta";
export declare enum VariablePrimitiveType {
    Void = 1,
    Int = 2,
    Float = 3,
    String = 4,
    Boolean = 5,
    Date = 6,
    Array = 7,
    Custom = 8
}
export declare type VariableTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | ClassType;
export interface IVariableMeta extends IMeta {
    readonly Type: VariablePrimitiveType;
    readonly TypeName: string;
    readonly TypeRef: ClassType;
    readonly IsArray: boolean;
    readonly ArrayElement?: VariableMeta;
    readonly IsPrimary: boolean;
}
export interface IOptionsVariableMeta {
    level: number;
    type: VariablePrimitiveType;
    typeName: string;
    typeRef: ClassType;
    isArray?: boolean;
    arrayElement?: VariableMeta;
    IsPrimary: boolean;
}
export declare class VariableMeta implements IVariableMeta {
    readonly Level: number;
    readonly Type: VariablePrimitiveType;
    readonly TypeName: string;
    readonly TypeRef: ClassType;
    readonly IsArray: boolean;
    readonly ArrayElement?: VariableMeta;
    readonly IsPrimary: boolean;
    constructor(options: IOptionsVariableMeta);
}
