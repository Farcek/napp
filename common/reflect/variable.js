"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VariableType;
(function (VariableType) {
    /**
     * Propery type int, long , string, bool, float, double, date
     */
    VariableType[VariableType["Primitive"] = 1] = "Primitive";
    VariableType[VariableType["Complex"] = 2] = "Complex";
})(VariableType = exports.VariableType || (exports.VariableType = {}));
var VariablePrimitiveType;
(function (VariablePrimitiveType) {
    VariablePrimitiveType[VariablePrimitiveType["Void"] = 1] = "Void";
    VariablePrimitiveType[VariablePrimitiveType["Int"] = 2] = "Int";
    VariablePrimitiveType[VariablePrimitiveType["Float"] = 3] = "Float";
    VariablePrimitiveType[VariablePrimitiveType["String"] = 4] = "String";
    VariablePrimitiveType[VariablePrimitiveType["Symbol"] = 5] = "Symbol";
    VariablePrimitiveType[VariablePrimitiveType["Boolean"] = 6] = "Boolean";
    VariablePrimitiveType[VariablePrimitiveType["Date"] = 7] = "Date";
})(VariablePrimitiveType = exports.VariablePrimitiveType || (exports.VariablePrimitiveType = {}));
class VariableMeta {
    constructor(type, ref) {
        this.Level = 0;
        this.Type = type;
        this.Refrence = ref;
    }
    eq(o) {
        return o.Type === this.Type && o.Refrence === this.Refrence;
    }
}
exports.VariableMeta = VariableMeta;
//# sourceMappingURL=variable.js.map