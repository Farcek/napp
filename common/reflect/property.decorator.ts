import { VariableTypes } from "./variable";
import { NameMeta } from "./name.meta";
import { ReflectName } from "./name.helper";
import { MetaLevel } from "./meta";
import { ReflectVariable } from "./variable.helper";
import { ClassType } from "../common";
import { ReflectProperty } from "./property.helper";
import { ReflectDescription } from "./description.helper";
import { DescriptionMeta } from "./description.meta";

export interface IPropertyDecorator {

    /**
     * tuhain gishuuni ner;
     * 
     * default : variavle name
     */
    name?: string;

    description?: string;

    // group?: string;

    // /**
    //  * erembleh index;
    //  * default: 0
    //  */
    // index?: number;

    type?: VariableTypes;
}
export function PropertyDecorator(options?: IPropertyDecorator) {
    return (target: object, propertyKey: string, descriptor?: PropertyDescriptor) => {

        ReflectProperty.GetProperiesMeta(target.constructor as ClassType).add(propertyKey);

        // name meta
        let propertyName = options && options.name || propertyKey;
        let nameMeta = new NameMeta(propertyName, MetaLevel.Level1);
        ReflectName.setNameMeta(nameMeta, target.constructor as ClassType, propertyKey);



        if (options && options.description) {
            let desc = new DescriptionMeta( options.description, MetaLevel.Level1);
            ReflectDescription.setMeta(desc, target.constructor as ClassType, propertyKey);
        }

        // if (options && options.group) {
        //     Reflect.defineMetadata(PropertyMetaGroup, options.group, target.constructor, propertyKey);
        // }

        // if (options && options.index) {
        //     Reflect.defineMetadata(PropertyMetaIndex, options.index, target.constructor, propertyKey);
        // }

        if (options && options.type) {
            let variableMeta = ReflectVariable.factoryVariableMeta(options.type);
            ReflectVariable.setVariableMeta(variableMeta, target.constructor as ClassType, propertyKey);
        }

    };
}

export const Property = PropertyDecorator;
