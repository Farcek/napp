"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_meta_1 = require("./property.meta");
const meta_1 = require("./meta");
var ReflectProperty;
(function (ReflectProperty) {
    function GetProperiesMeta(cls) {
        let m = meta_1.ReflectMeta.GetMeta(property_meta_1.$$MetakeyProperties, cls);
        if (m && m instanceof property_meta_1.PropertiesMeta) {
            return m;
        }
        m = new property_meta_1.PropertiesMeta();
        meta_1.ReflectMeta.SetMeta(property_meta_1.$$MetakeyProperties, m, cls);
        return m;
    }
    ReflectProperty.GetProperiesMeta = GetProperiesMeta;
})(ReflectProperty = exports.ReflectProperty || (exports.ReflectProperty = {}));
//# sourceMappingURL=property.helper.js.map