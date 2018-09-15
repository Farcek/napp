"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = require("./variable");
const variable_decorator_1 = require("./variable.decorator");
const meta_1 = require("./meta");
var ReflectVariable;
(function (ReflectVariable) {
    function factoryVariableMetaArray(elementType, level) {
        return new variable_1.VariableMeta({
            type: variable_1.VariablePrimitiveType.Array,
            typeName: "array",
            typeRef: Array,
            IsPrimary: false,
            level: level || meta_1.MetaLevel.Level0,
            isArray: true,
            arrayElement: elementType
        });
    }
    ReflectVariable.factoryVariableMetaArray = factoryVariableMetaArray;
    function factoryVariableMeta(type, level) {
        if (type) {
            if (type === String || type === "string") {
                return new variable_1.VariableMeta({
                    type: variable_1.VariablePrimitiveType.String,
                    typeName: "string",
                    typeRef: String,
                    IsPrimary: true,
                    level: level || meta_1.MetaLevel.Level0,
                    isArray: false
                });
            }
            if (type === Number || type === "int") {
                return new variable_1.VariableMeta({
                    type: variable_1.VariablePrimitiveType.Int,
                    typeName: "int",
                    typeRef: Number,
                    IsPrimary: true,
                    level: level || meta_1.MetaLevel.Level0,
                    isArray: false
                });
            }
            if (type === "float") {
                return new variable_1.VariableMeta({
                    type: variable_1.VariablePrimitiveType.Float,
                    typeName: "float",
                    typeRef: Number,
                    IsPrimary: true,
                    level: level || meta_1.MetaLevel.Level0,
                    isArray: false
                });
            }
            if (type === Boolean || type === "boolean") {
                return new variable_1.VariableMeta({
                    type: variable_1.VariablePrimitiveType.Boolean,
                    typeName: "boolean",
                    typeRef: Boolean,
                    IsPrimary: true,
                    level: level || meta_1.MetaLevel.Level0,
                    isArray: false
                });
            }
            if (type === Date || type === "date") {
                return new variable_1.VariableMeta({
                    type: variable_1.VariablePrimitiveType.Date,
                    typeName: "date",
                    typeRef: Date,
                    IsPrimary: true,
                    level: level || meta_1.MetaLevel.Level0,
                    isArray: false
                });
            }
            return new variable_1.VariableMeta({
                type: variable_1.VariablePrimitiveType.Custom,
                typeName: type.name,
                typeRef: type,
                IsPrimary: false,
                level: level || meta_1.MetaLevel.Level0,
                isArray: false
            });
        }
        return new variable_1.VariableMeta({
            type: variable_1.VariablePrimitiveType.Void,
            typeName: "void",
            typeRef: Error,
            IsPrimary: true,
            level: level || meta_1.MetaLevel.Level0,
            isArray: false
        });
    }
    ReflectVariable.factoryVariableMeta = factoryVariableMeta;
    function setVariableMeta(meta, target, propertyKey) {
        return meta_1.ReflectMeta.SetMeta(variable_decorator_1.$$MetakeyVariable, meta, target, propertyKey);
    }
    ReflectVariable.setVariableMeta = setVariableMeta;
    function getVariableMeta(target, propertyKey) {
        let m = meta_1.ReflectMeta.GetMeta(variable_decorator_1.$$MetakeyVariable, target, propertyKey);
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