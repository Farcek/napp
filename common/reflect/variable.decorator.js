"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_helper_1 = require("./variable.helper");
const property_helper_1 = require("./property.helper");
const meta_1 = require("./meta");
exports.$$MetakeyVariable = "design:variable";
function VariableDecorator(type) {
    return (target, propertyKey) => {
        property_helper_1.ReflectProperty.GetProperiesMeta(target.constructor).add(propertyKey);
        let variableMeta = variable_helper_1.ReflectVariable.factoryVariableMeta(type);
        variableMeta.Level = meta_1.MetaLevel.Level2;
        variable_helper_1.ReflectVariable.setVariableMeta(variableMeta, target.constructor, propertyKey);
    };
}
exports.VariableDecorator = VariableDecorator;
exports.Variable = VariableDecorator;
exports.Type = VariableDecorator;
//# sourceMappingURL=variable.decorator.js.map