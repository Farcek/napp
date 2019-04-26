import { decoratorFactoryAll, DecoratorType, decoratorFactoryArgumentAndProperty, decoratorFactoryMethod } from "./decorator.factory";
import { ReflectTypes } from "./type";

export const Name = decoratorFactoryAll<string>((meta, decoratorOption, name) => {
    if (decoratorOption.decoratorType == DecoratorType.class) {
        meta.classSetName(name);
    } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
        meta.properySetName(decoratorOption.property.name, name);
    } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
        meta.methodSetName(decoratorOption.method.name, name);
    } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
        meta.argumentSetName(decoratorOption.argument.method, decoratorOption.argument.index, name);
    }
    return false;
});

export const Description = decoratorFactoryAll<string>((meta, decoratorOption, description) => {
    if (decoratorOption.decoratorType == DecoratorType.class) {
        meta.classSetDescription(description);
    } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
        meta.properySetDescription(decoratorOption.property.name, description);
    } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
        meta.methodSetDescription(decoratorOption.method.name, description);
    } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
        meta.argumentSetDescription(decoratorOption.argument.method, decoratorOption.argument.index, description);
    }
    return false;
});


export const Type = decoratorFactoryArgumentAndProperty<ReflectTypes>((meta, decoratorOption, type) => {
    if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
        meta.properySetType(decoratorOption.property.name, type);
    } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
        meta.argumentSetType(decoratorOption.argument.method, decoratorOption.argument.index, type);
    }
    return false;
});

export const Return = decoratorFactoryMethod<ReflectTypes>((meta, decoratorOption, type) => {
    if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
        meta.methodSetReturn(decoratorOption.method.name, type);
    }
    return false;
});