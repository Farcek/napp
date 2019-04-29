import { decoratorFactoryAll, DecoratorType, decoratorFactoryArgumentAndProperty, decoratorFactoryMethod } from "./decorator.factory";
import { ReflectTypes } from "./type";

export function Name(name: string) {
    return decoratorFactoryAll<{ name: string }>({ name }, undefined, (meta, decoratorOption, data) => {
        if (decoratorOption.decoratorType == DecoratorType.class) {
            meta.classSetName(data.name);
        } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            meta.propertySetName(decoratorOption.property.name, data.name);
        } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            meta.methodSetName(decoratorOption.method.name, data.name);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            meta.argumentSetName(decoratorOption.argument.method, decoratorOption.argument.index, data.name);
        }
    });
}

export function Description(description: string) {
    return decoratorFactoryAll<{ description: string }>({ description }, undefined, (meta, decoratorOption, data) => {
        if (decoratorOption.decoratorType == DecoratorType.class) {
            meta.classSetDescription(data.description);
        } else if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            meta.propertySetDescription(decoratorOption.property.name, data.description);
        } else if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            meta.methodSetDescription(decoratorOption.method.name, data.description);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            meta.argumentSetDescription(decoratorOption.argument.method, decoratorOption.argument.index, data.description);
        }
    });
}

export function Type(type: ReflectTypes) {
    return decoratorFactoryArgumentAndProperty<{ type: ReflectTypes }>({ type }, undefined, (meta, decoratorOption, data) => {
        if (decoratorOption.decoratorType == DecoratorType.property && decoratorOption.property) {
            meta.propertySetType(decoratorOption.property.name, data.type);
        } else if (decoratorOption.decoratorType == DecoratorType.argument && decoratorOption.argument) {
            meta.argumentSetType(decoratorOption.argument.method, decoratorOption.argument.index, data.type);
        }
    });
}

export function Return(type: ReflectTypes) {
    return decoratorFactoryMethod<{ type: ReflectTypes }>({ type }, undefined, (meta, decoratorOption, data) => {
        if (decoratorOption.decoratorType == DecoratorType.method && decoratorOption.method) {
            meta.methodSetReturn(decoratorOption.method.name, data.type);
        }
    });
}