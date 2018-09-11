"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_helper_1 = require("./property.helper");
const meta_1 = require("./meta");
const description_meta_1 = require("./description.meta");
const description_helper_1 = require("./description.helper");
function DescriptionDecorator(name) {
    return (target, propertyKey) => {
        let meta = new description_meta_1.DescriptionMeta(name, meta_1.MetaLevel.Level2);
        if (propertyKey) {
            property_helper_1.ReflectProperty.GetProperiesMeta(target.constructor).add(propertyKey);
            description_helper_1.ReflectDescription.setMeta(meta, target.constructor, propertyKey);
        }
        else {
            description_helper_1.ReflectDescription.setMeta(meta, target);
        }
    };
}
exports.DescriptionDecorator = DescriptionDecorator;
exports.Description = DescriptionDecorator;
//# sourceMappingURL=description.decorator.js.map