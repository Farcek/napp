"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = require("./variable");
const variable_decorator_1 = require("./variable.decorator");
const meta_1 = require("./meta");
var ReflectVariable;
(function (ReflectVariable) {
    function buildVariableMetaAsPrimitive(type) {
        return new variable_1.VariableMeta(variable_1.VariableType.Primitive, type);
    }
    function factoryVariableMeta(type) {
        if (type) {
            // is primary
            if (type === String || type === "string") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.String);
            }
            if (type === Number || type === "int") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.Int);
            }
            if (type === "float") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.Float);
            }
            if (type === Symbol || type === "symbol") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.Symbol);
            }
            if (type === Boolean || type === "boolean") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.Boolean);
            }
            if (type === Date || type === "date") {
                return buildVariableMetaAsPrimitive(variable_1.VariablePrimitiveType.Date);
            }
            return new variable_1.VariableMeta(variable_1.VariableType.Complex, type);
        }
        return new variable_1.VariableMeta(variable_1.VariableType.Primitive, variable_1.VariablePrimitiveType.Void);
    }
    ReflectVariable.factoryVariableMeta = factoryVariableMeta;
    function setVariableMeta(meta, target, propertyKey) {
        return meta_1.ReflectMeta.SetMeta(variable_decorator_1.$$MetakeyVariable, meta, target, propertyKey);
    }
    ReflectVariable.setVariableMeta = setVariableMeta;
    function getVariableMeta(target, propertyKey) {
        let m = meta_1.ReflectMeta.GetMeta(variable_decorator_1.$$MetakeyVariable, target.constructor, propertyKey);
        if (m && m instanceof variable_1.VariableMeta) {
            return m;
        }
        let type = meta_1.ReflectMeta.GetMeta("design:type", target, propertyKey);
        if (type) {
            return ReflectVariable.factoryVariableMeta(type);
        }
        return null;
    }
    ReflectVariable.getVariableMeta = getVariableMeta;
})(ReflectVariable = exports.ReflectVariable || (exports.ReflectVariable = {}));
//# sourceMappingURL=variable.helper.js.map