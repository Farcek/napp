"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_meta_1 = require("./name.meta");
const name_helper_1 = require("./name.helper");
const property_helper_1 = require("./property.helper");
const meta_1 = require("./meta");
function NameDecorator(name) {
    return (target, propertyKey) => {
        let meta = new name_meta_1.NameMeta(name, meta_1.MetaLevel.Level2);
        if (propertyKey) {
            property_helper_1.ReflectProperty.GetProperiesMeta(target.constructor).add(propertyKey);
            name_helper_1.ReflectName.setNameMeta(meta, target.constructor, propertyKey);
        }
        else {
            name_helper_1.ReflectName.setNameMeta(meta, target);
        }
    };
}
exports.NameDecorator = NameDecorator;
exports.Name = NameDecorator;
//# sourceMappingURL=name.decorator.js.map