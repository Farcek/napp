import { decoratorFactoryAll, DecoratorType, decoratorFactoryArgumentAndProperty, decoratorFactoryMethod } from "./decorator.factory";
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

export function Type(type: ReflectTypes) {
    return decoratorFactoryArgumentAndProperty<void>((target, decoratorOption, ) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            classmeta.propertySetType(decoratorOption.property.name, type);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            classmeta.argumentSetType(decoratorOption.argument.method, decoratorOption.argument.index, type);
        }
    });
}

export function Return(type: ReflectTypes) {
    return decoratorFactoryMethod<void>((target, decoratorOption) => {
        let { classmeta } = decoratorOption;
        if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            classmeta.methodSetReturn(decoratorOption.method.name, type);
        }
    });
}