import { ClassType } from "../common";
import { BaseMeta } from "./meta";
export enum VariablePrimitiveType {
    Void = 1,
    Int, Float,
    String,
    Boolean,
    Date,
    Array,
    Custom
}

// tslint:disable-next-line:ban-types
export type VariableTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | ClassType;

export interface IOptionsVariableMeta {
    level?: number;
    type: VariablePrimitiveType;
    typeName: string;
    typeRef: ClassType;

    isArray?: boolean;

    arrayElement?: VariableMeta;

    IsPrimary: boolean;
}
export class VariableMeta extends BaseMeta {
    readonly Type: VariablePrimitiveType;
    readonly TypeName: string;
    readonly TypeRef: ClassType;

    readonly IsArray: boolean;

    readonly ArrayElement?: VariableMeta;

    readonly IsPrimary: boolean;

    constructor(options: IOptionsVariableMeta) {
        super(options.level);
        this.Type = options.type;
        this.TypeName = options.typeName;
        this.TypeRef = options.typeRef;
        this.IsPrimary = options.IsPrimary;

        // array
        this.IsArray = options.isArray || false;
        this.ArrayElement = options.arrayElement;
    }


   

    // typeName() {
    //     if (this.Type === VariableType.Primitive) {
    //         switch (this.Refrence) {
    //             case VariablePrimitiveType.Boolean:
    //                 return "boolean";
    //             case VariablePrimitiveType.Date:
    //                 return "date";
    //             case VariablePrimitiveType.Float:
    //                 return "float";
    //             case VariablePrimitiveType.Int:
    //                 return "int";
    //             case VariablePrimitiveType.String:
    //                 return "string";
    //             case VariablePrimitiveType.Symbol:
    //                 return "symbol";
    //             case VariablePrimitiveType.Void:
    //                 return "void";
    //         }
    //         return "null";
    //     }

    //     return (this.Refrence as ClassType).name;
    // }

    // toString() {
    //     return `VariableMeta(${this.Type === VariableType.Primitive ? "Primitive" : "Complex"}, ${this.typeName()}, ${this.Level})`;
    // }
}
