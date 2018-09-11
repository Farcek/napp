"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("./meta");
const name_meta_1 = require("./name.meta");
var ReflectName;
(function (ReflectName) {
    function setNameMeta(meta, target, propertyKey) {
        return meta_1.ReflectMeta.SetMeta(name_meta_1.$$MetakeyName, meta, target, propertyKey);
    }
    ReflectName.setNameMeta = setNameMeta;
    function getNameMeta(target, propertyKey) {
        if (propertyKey) {
            let pMeta = meta_1.ReflectMeta.GetMeta(name_meta_1.$$MetakeyName, target, propertyKey);
            if (pMeta instanceof name_meta_1.NameMeta) {
                return pMeta;
            }
            return null;
        }
        let cMeta = meta_1.ReflectMeta.GetMeta(name_meta_1.$$MetakeyName, target);
        if (cMeta) {
            return cMeta;
        }
        if (target && target.name) {
            let meta = new name_meta_1.NameMeta(target.name, meta_1.MetaLevel.Level0);
            setNameMeta(meta, target);
            return meta;
        }
        return null;
    }
    ReflectName.getNameMeta = getNameMeta;
})(ReflectName = exports.ReflectName || (exports.ReflectName = {}));
//# sourceMappingURL=name.helper.js.map