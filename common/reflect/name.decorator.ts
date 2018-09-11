import { initMetadata } from "./helper";
import { $$MetakeyName, NameMeta } from "./name.meta";
import { $$MetakeyProperties } from "./property.meta";
import { ReflectName } from "./name.helper";
import { ReflectProperty } from "./property.helper";
import { MetaLevel } from "./meta";
import { ClassType } from "../common";




export function NameDecorator(name: string) {
    return (target: object, propertyKey?: string) => {

        let meta = new NameMeta(name, MetaLevel.Level2);

        if (propertyKey) {
            ReflectProperty.GetProperiesMeta(target.constructor as ClassType).add(propertyKey);
            ReflectName.setNameMeta(meta, target.constructor as ClassType, propertyKey);
        } else {
            ReflectName.setNameMeta(meta, target as ClassType);
        }
    };
}

export const Name = NameDecorator;
