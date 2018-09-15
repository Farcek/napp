"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_meta_1 = require("./name.meta");
const name_helper_1 = require("./name.helper");
const meta_1 = require("./meta");
const variable_helper_1 = require("./variable.helper");
const property_helper_1 = require("./property.helper");
const description_helper_1 = require("./description.helper");
const description_meta_1 = require("./description.meta");
function PropertyDecorator(options) {
    return (target, propertyKey, descriptor) => {
        property_helper_1.ReflectProperty.GetProperiesMeta(target.constructor).add(propertyKey);
        // name meta
        let propertyName = options && options.name || propertyKey;
        let nameMeta = new name_meta_1.NameMeta(propertyName, meta_1.MetaLevel.Level1);
        name_helper_1.ReflectName.setNameMeta(nameMeta, target.constructor, propertyKey);
        if (options && options.description) {
            let desc = new description_meta_1.DescriptionMeta(options.description, meta_1.MetaLevel.Level1);
            description_helper_1.ReflectDescription.setMeta(desc, target.constructor, propertyKey);
        }
        // if (options && options.group) {
        //     Reflect.defineMetadata(PropertyMetaGroup, options.group, target.constructor, propertyKey);
        // }
        // if (options && options.index) {
        //     Reflect.defineMetadata(PropertyMetaIndex, options.index, target.constructor, propertyKey);
        // }
        if (options && options.type) {
            let variableMeta = variable_helper_1.ReflectVariable.factoryVariableMeta(options.type);
            if (options.isArray) {
                let arrMeta = variable_helper_1.ReflectVariable.factoryVariableMetaArray(variableMeta);
                variable_helper_1.ReflectVariable.setVariableMeta(arrMeta, target.constructor, propertyKey);
            }
            else {
                variable_helper_1.ReflectVariable.setVariableMeta(variableMeta, target.constructor, propertyKey);
            }
        }
    };
}
exports.PropertyDecorator = PropertyDecorator;
exports.Property = PropertyDecorator;
//# sourceMappingURL=property.decorator.js.map