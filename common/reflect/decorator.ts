import { PropertyMetaKeys, PropertyMetaName, PropertyMetaIndex, PropertyMetaDescription, PropertyMetaGroup } from "./property.meta";
import { initMetadata } from "./helper";
import { ClassMetaName, ClassMetaDescription, ClassMetaGroup } from "./class.meta";


export interface IProperyDecorator {

    /**
     * tuhain gishuuni ner;
     * 
     * default : variavle name
     */
    name?: string;

    description?: string;

    group?: string;

    /**
     * erembleh index;
     * default: 0
     */
    index?: number;

    type?: string;
}
export function ProperyDecorator(options?: IProperyDecorator) {
    return (target: object, propertyKey: string) => {

        let properyName = (options && options.name) || propertyKey;

        let keys = initMetadata(PropertyMetaKeys, target.constructor, {} as { [key: string]: boolean });
        keys[propertyKey] = true;

        Reflect.defineMetadata(PropertyMetaName, properyName, target.constructor, propertyKey);

        if (options && options.description) {
            Reflect.defineMetadata(PropertyMetaDescription, options.description, target.constructor, propertyKey);
        }

        if (options && options.group) {
            Reflect.defineMetadata(PropertyMetaGroup, options.group, target.constructor, propertyKey);
        }

        if (options && options.index) {
            Reflect.defineMetadata(PropertyMetaIndex, options.index, target.constructor, propertyKey);
        }

    };
}

export function NameDecorator(name: string) {
    return (target: object, propertyKey?: string) => {

        if (propertyKey) {
            let keys = initMetadata(PropertyMetaKeys, target.constructor, {} as { [key: string]: boolean });
            keys[propertyKey] = true;

            Reflect.defineMetadata(PropertyMetaName, name, target.constructor, propertyKey);
        } else {
            Reflect.defineMetadata(ClassMetaName, name, target);
        }
    };
}

export function DescriptionDecorator(description: string) {
    return (target: object, propertyKey?: string) => {


        if (propertyKey) {
            let keys = initMetadata(PropertyMetaKeys, target.constructor, {} as { [key: string]: boolean });
            keys[propertyKey] = true;

            Reflect.defineMetadata(PropertyMetaDescription, description, target.constructor, propertyKey);
        } else {
            Reflect.defineMetadata(ClassMetaDescription, description, target);
        }
    };
}

export function GroupDecorator(group: string) {
    return (target: object, propertyKey?: string) => {

        if (propertyKey) {
            let keys = initMetadata(PropertyMetaKeys, target.constructor, {} as { [key: string]: boolean });
            keys[propertyKey] = true;

            Reflect.defineMetadata(PropertyMetaGroup, group, target.constructor, propertyKey);
        } else {
            Reflect.defineMetadata(ClassMetaGroup, group, target);
        }
    };
}

export function IndexDecorator(index: number) {
    return (target: object, propertyKey: string) => {


        let keys = initMetadata(PropertyMetaKeys, target.constructor, {} as { [key: string]: boolean });
        keys[propertyKey] = true;

        Reflect.defineMetadata(PropertyMetaIndex, index, target.constructor, propertyKey);
    };
}

export const Propery = ProperyDecorator;
export const Name = NameDecorator;
export const Description = DescriptionDecorator;
export const Group = GroupDecorator;
export const Index = IndexDecorator;
