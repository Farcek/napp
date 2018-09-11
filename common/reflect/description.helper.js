"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("./meta");
const description_meta_1 = require("./description.meta");
var ReflectDescription;
(function (ReflectDescription) {
    function setMeta(meta, target, propertyKey) {
        return meta_1.ReflectMeta.SetMeta(description_meta_1.$$MetakeyDescription, meta, target, propertyKey);
    }
    ReflectDescription.setMeta = setMeta;
    function getMeta(target, propertyKey) {
        if (propertyKey) {
            let pMeta = meta_1.ReflectMeta.GetMeta(description_meta_1.$$MetakeyDescription, target, propertyKey);
            if (pMeta instanceof description_meta_1.DescriptionMeta) {
                return pMeta;
            }
            return null;
        }
        let cMeta = meta_1.ReflectMeta.GetMeta(description_meta_1.$$MetakeyDescription, target);
        if (cMeta) {
            return cMeta;
        }
        return null;
    }
    ReflectDescription.getMeta = getMeta;
})(ReflectDescription = exports.ReflectDescription || (exports.ReflectDescription = {}));
//# sourceMappingURL=description.helper.js.map