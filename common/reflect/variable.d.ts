import { ClassType } from "../common";
import { BaseMeta } from "./meta";
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
export interface IOptionsVariableMeta {
    level?: number;
    type: VariablePrimitiveType;
    typeName: string;
    typeRef: ClassType;
    isArray?: boolean;
    arrayElement?: VariableMeta;
    IsPrimary: boolean;
}
export declare class VariableMeta extends BaseMeta {
    readonly Type: VariablePrimitiveType;
    readonly TypeName: string;
    readonly TypeRef: ClassType;
    readonly IsArray: boolean;
    readonly ArrayElement?: VariableMeta;
    readonly IsPrimary: boolean;
    constructor(options: IOptionsVariableMeta);
}
