import { ReflectVariable } from "./variable.helper";
import { VariableTypes } from "./variable";
import { ReflectProperty } from "./property.helper";
import { ClassType } from "../common";
import { MetaLevel } from "./meta";

export const $$MetakeyVariable = "design:variable";


export function VariableDecorator(type: VariableTypes) {
    return (target: object, propertyKey: string) => {
        ReflectProperty.GetProperiesMeta(target.constructor as ClassType).add(propertyKey);

        let variableMeta = ReflectVariable.factoryVariableMeta(type);
        variableMeta.Level = MetaLevel.Level2;
        
        ReflectVariable.setVariableMeta(variableMeta, target.constructor as ClassType, propertyKey);
    };
}

export const Variable = VariableDecorator;
export const Type = VariableDecorator;
