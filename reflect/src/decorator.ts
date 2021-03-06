import { decoratorFactoryAll, DecoratorType, decoratorFactoryArgumentAndProperty, decoratorFactoryMethod, decoratorFactoryProperty } from "./decorator.factory";
import { ReflectTypes } from "./type";

export function Name(nameOftarget: string) {
    return decoratorFactoryAll<void>((target, decoratorOption) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.class) {
            classmeta.classSetName(nameOftarget);
        } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            classmeta.propertySetName(decoratorOption.property.name, nameOftarget);
        } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            classmeta.methodSetName(decoratorOption.method.name, nameOftarget);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            classmeta.argumentSetName(decoratorOption.argument.method, decoratorOption.argument.index, nameOftarget);
        }
    });
}

export function Description(description: string) {
    return decoratorFactoryAll<void>((target, decoratorOption) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.class) {
            classmeta.classSetDescription(description);
        } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            classmeta.propertySetDescription(decoratorOption.property.name, description);
        } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            classmeta.methodSetDescription(decoratorOption.method.name, description);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            classmeta.argumentSetDescription(decoratorOption.argument.method, decoratorOption.argument.index, description);
        }
    });
}

export function Type(type: ReflectTypes, isArray?: boolean) {
    return decoratorFactoryArgumentAndProperty<void>((target, decoratorOption, ) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            classmeta.propertySetType(decoratorOption.property.name, type, isArray || false);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            classmeta.argumentSetType(decoratorOption.argument.method, decoratorOption.argument.index, type, isArray || false);
        }
    });
}

export function Return(type: ReflectTypes, isArray?: boolean) {
    return decoratorFactoryMethod<void>((target, decoratorOption) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            classmeta.methodSetReturn(decoratorOption.method.name, type, isArray || false);
        }
    });
}

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

    type?: ReflectTypes;
    isArray?: boolean;
}
export function Property(options?: IPropertyDecorator) {
    return decoratorFactoryProperty((target, decoratorOption) => {
        let { classmeta, decoratorType, property } = decoratorOption;
        if (decoratorType == DecoratorType.property && property) {
            if (options && options.name) {
                classmeta.propertySetName(property.name, options.name);
            }

            if (options && options.description) {
                classmeta.propertySetDescription(property.name, options.description);
            }

            if (options && options.type) {
                classmeta.propertySetType(property.name, options.type, options.isArray || false);
            }
        }
    });
}