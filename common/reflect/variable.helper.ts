
import { VariableType, VariablePrimitiveType, VariableTypes, VariableMeta, IVariableMeta } from "./variable";
import { ClassType } from "../common";
import { $$MetakeyVariable } from "./variable.decorator";
import { ReflectMeta } from "./meta";

export namespace ReflectVariable {

    function buildVariableMetaAsPrimitive(type: VariablePrimitiveType) {
        return new VariableMeta(VariableType.Primitive, type);
    }

    export function factoryVariableMeta(type: VariableTypes): VariableMeta {

        if (type) {
            // is primary
            if (type === String || type === "string") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.String);
            }

            if (type === Number || type === "int") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.Int);
            }

            if (type === "float") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.Float);
            }

            if (type === Symbol || type === "symbol") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.Symbol);
            }

            if (type === Boolean || type === "boolean") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.Boolean);
            }
            if (type === Date || type === "date") {
                return buildVariableMetaAsPrimitive(VariablePrimitiveType.Date);
            }

            return new VariableMeta(VariableType.Complex, type as ClassType);

        }

        return new VariableMeta(VariableType.Primitive, VariablePrimitiveType.Void);
    }

    export function setVariableMeta(meta: IVariableMeta, target: ClassType, propertyKey: string): boolean {
        return ReflectMeta.SetMeta($$MetakeyVariable, meta, target, propertyKey);
    }

    export function getVariableMeta(target: ClassType, propertyKey: string) {
        let m = ReflectMeta.GetMeta<IVariableMeta>($$MetakeyVariable, target.constructor as ClassType, propertyKey);
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

