"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VariablePrimitiveType;
(function (VariablePrimitiveType) {
    VariablePrimitiveType[VariablePrimitiveType["Void"] = 1] = "Void";
    VariablePrimitiveType[VariablePrimitiveType["Int"] = 2] = "Int";
    VariablePrimitiveType[VariablePrimitiveType["Float"] = 3] = "Float";
    VariablePrimitiveType[VariablePrimitiveType["String"] = 4] = "String";
    VariablePrimitiveType[VariablePrimitiveType["Boolean"] = 5] = "Boolean";
    VariablePrimitiveType[VariablePrimitiveType["Date"] = 6] = "Date";
    VariablePrimitiveType[VariablePrimitiveType["Array"] = 7] = "Array";
    VariablePrimitiveType[VariablePrimitiveType["Custom"] = 8] = "Custom";
})(VariablePrimitiveType = exports.VariablePrimitiveType || (exports.VariablePrimitiveType = {}));
class VariableMeta {
    constructor(options) {
        this.Level = 0;
        this.Type = options.type;
        this.TypeName = options.typeName;
        this.TypeRef = options.typeRef;
        this.IsPrimary = options.IsPrimary;
        // meta
        this.Level = options.level;
        // array
        this.IsArray = options.isArray || false;
        this.ArrayElement = options.arrayElement;
    }
}
exports.VariableMeta = VariableMeta;
//# sourceMappingURL=variable.js.map