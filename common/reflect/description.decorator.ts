import { ReflectProperty } from "./property.helper";
import { MetaLevel } from "./meta";
import { ClassType } from "../common";
import { DescriptionMeta } from "./description.meta";
import { ReflectDescription } from "./description.helper";




export function DescriptionDecorator(name: string) {
    return (target: object, propertyKey?: string) => {
        let meta = new DescriptionMeta(name, MetaLevel.Level2);
        if (propertyKey) {
            ReflectProperty.GetProperiesMeta(target.constructor as ClassType).add(propertyKey);
            ReflectDescription.setMeta(meta, target.constructor as ClassType, propertyKey);
        } else {
            ReflectDescription.setMeta(meta, target as ClassType);
        }
    };
}

export const Description = DescriptionDecorator;
