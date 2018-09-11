"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetaLevel;
(function (MetaLevel) {
    MetaLevel[MetaLevel["Level0"] = 0] = "Level0";
    MetaLevel[MetaLevel["Level1"] = 100] = "Level1";
    MetaLevel[MetaLevel["Level2"] = 200] = "Level2";
    // Level3 = 300,
    // Level4 = 400,
})(MetaLevel = exports.MetaLevel || (exports.MetaLevel = {}));
var ReflectMeta;
(function (ReflectMeta) {
    function SetMeta($$metaname, meta, target, propertyKey) {
        let old = Reflect.getMetadata($$metaname, target.prototype, propertyKey);
        if (!old || (old && old.Level <= meta.Level)) {
            Reflect.defineMetadata($$metaname, meta, target.prototype, propertyKey);
            return true;
        }
        return false;
    }
    ReflectMeta.SetMeta = SetMeta;
    function GetMeta($$metaname, target, propertyKey) {
        let m = Reflect.getMetadata($$metaname, target.prototype, propertyKey);
        if (m) {
            return m;
        }
        return null;
    }
    ReflectMeta.GetMeta = GetMeta;
    function DeleteMeta($$metaname, target, propertyKey) {
        return Reflect.deleteMetadata($$metaname, target.prototype, propertyKey);
    }
    ReflectMeta.DeleteMeta = DeleteMeta;
})(ReflectMeta = exports.ReflectMeta || (exports.ReflectMeta = {}));
//# sourceMappingURL=meta.js.map