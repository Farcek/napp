"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyType;
(function (PropertyType) {
    /**
     * Propery type int, long , string, bool, float, double, date
     */
    PropertyType[PropertyType["Primary"] = 1] = "Primary";
    PropertyType[PropertyType["Object"] = 2] = "Object";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
var PropertyPrimaryType;
(function (PropertyPrimaryType) {
    /**
     * Propery type int, long , string, symbol ,char, bool, float, double, date
     */
    PropertyPrimaryType[PropertyPrimaryType["Int"] = 1] = "Int";
    PropertyPrimaryType[PropertyPrimaryType["Long"] = 2] = "Long";
    PropertyPrimaryType[PropertyPrimaryType["String"] = 3] = "String";
    PropertyPrimaryType[PropertyPrimaryType["Char"] = 4] = "Char";
    PropertyPrimaryType[PropertyPrimaryType["Symbol"] = 5] = "Symbol";
    PropertyPrimaryType[PropertyPrimaryType["Boolean"] = 6] = "Boolean";
    PropertyPrimaryType[PropertyPrimaryType["Float"] = 7] = "Float";
    PropertyPrimaryType[PropertyPrimaryType["Double"] = 8] = "Double";
    PropertyPrimaryType[PropertyPrimaryType["Date"] = 9] = "Date";
})(PropertyPrimaryType = exports.PropertyPrimaryType || (exports.PropertyPrimaryType = {}));
//# sourceMappingURL=common.js.map