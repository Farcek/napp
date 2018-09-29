
import { VariablePrimitiveType, VariableTypes, VariableMeta } from "./variable";
import { ClassType } from "../common";
import { $$MetakeyVariable } from "./variable.decorator";
import { ReflectMeta, MetaLevel } from "./meta";

export namespace ReflectVariable {

    export function factoryVariableMetaArray(elementType: VariableMeta, level?: number): VariableMeta {
        return new VariableMeta({
            type: VariablePrimitiveType.Array,
            typeName: "array",
            typeRef: Array,
            IsPrimary: false,
            level: level || MetaLevel.Level0,
            isArray: true,
            arrayElement: elementType
        });
    }
    export function factoryVariableMeta(type: VariableTypes, level?: number): VariableMeta {

        if (type) {
            if (type === String || type === "string") {
                return new VariableMeta({
                    type: VariablePrimitiveType.String,
                    typeName: "string",
                    typeRef: String,
                    IsPrimary: true,
                    level: level || MetaLevel.Level0,
                    isArray: false
                });
            }

            if (type === Number || type === "int") {
                return new VariableMeta({
                    type: VariablePrimitiveType.Int,
                    typeName: "int",
                    typeRef: Number,
                    IsPrimary: true,
                    level: level || MetaLevel.Level0,
                    isArray: false
                });
            }

            if (type === "float") {
                return new VariableMeta({
                    type: VariablePrimitiveType.Float,
                    typeName: "float",
                    typeRef: Number,
                    IsPrimary: true,
                    level: level || MetaLevel.Level0,
                    isArray: false
                });
            }



            if (type === Boolean || type === "boolean") {
                return new VariableMeta({
                    type: VariablePrimitiveType.Boolean,
                    typeName: "boolean",
                    typeRef: Boolean,
                    IsPrimary: true,
                    level: level || MetaLevel.Level0,
                    isArray: false
                });
            }
            if (type === Date || type === "date") {
                return new VariableMeta({
                    type: VariablePrimitiveType.Date,
                    typeName: "date",
                    typeRef: Date,
                    IsPrimary: true,
                    level: level || MetaLevel.Level0,
                    isArray: false
                });
            }

            return new VariableMeta({
                type: VariablePrimitiveType.Custom,
                typeName: type.name,
                typeRef: type,
                IsPrimary: false,
                level: level || MetaLevel.Level0,
                isArray: false
            });
        }

        return new VariableMeta({
            type: VariablePrimitiveType.Void,
            typeName: "void",
            typeRef: Error,
            IsPrimary: true,
            level: level || MetaLevel.Level0,
            isArray: false
        });
    }

    export function setVariableMeta(meta: VariableMeta, target: ClassType, propertyKey: string): boolean {
        return ReflectMeta.SetMeta($$MetakeyVariable, meta, target, propertyKey);
    }

    export function getVariableMeta(target: ClassType, propertyKey: string) {
        let m = ReflectMeta.GetMeta<VariableMeta>($$MetakeyVariable, target, propertyKey);
        if (m && m instanceof VariableMeta) {
            return m;
        }

        let type: VariableTypes | null = ReflectMeta.GetMeta("design:type", target, propertyKey);

        if (type) {
            return ReflectVariable.factoryVariableMeta(type);
        }
        return null;
    }
}

