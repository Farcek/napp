"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_helper_1 = require("./variable.helper");
const property_helper_1 = require("./property.helper");
const meta_1 = require("./meta");
exports.$$MetakeyVariable = "design:variable";
function VariableDecorator(type, isArray) {
    return (target, propertyKey) => {
        property_helper_1.ReflectProperty.GetProperiesMeta(target.constructor).add(propertyKey);
        let variableMeta = variable_helper_1.ReflectVariable.factoryVariableMeta(type, meta_1.MetaLevel.Level2);
        if (isArray) {
            let arrayMeta = variable_helper_1.ReflectVariable.factoryVariableMetaArray(variableMeta, meta_1.MetaLevel.Level2);
            variable_helper_1.ReflectVariable.setVariableMeta(arrayMeta, target.constructor, propertyKey);
        }
        else {
            variable_helper_1.ReflectVariable.setVariableMeta(variableMeta, target.constructor, propertyKey);
        }
    };
}
exports.VariableDecorator = VariableDecorator;
exports.Variable = VariableDecorator;
exports.Type = VariableDecorator;
//# sourceMappingURL=variable.decorator.js.map