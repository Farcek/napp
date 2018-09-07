"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_meta_1 = require("./property.meta");
const helper_1 = require("./helper");
const class_meta_1 = require("./class.meta");
function ProperyDecorator(options) {
    return (target, propertyKey) => {
        let properyName = (options && options.name) || propertyKey;
        let keys = helper_1.initMetadata(property_meta_1.PropertyMetaKeys, target.constructor, {});
        keys[propertyKey] = true;
        Reflect.defineMetadata(property_meta_1.PropertyMetaName, properyName, target.constructor, propertyKey);
        if (options && options.description) {
            Reflect.defineMetadata(property_meta_1.PropertyMetaDescription, options.description, target.constructor, propertyKey);
        }
        if (options && options.group) {
            Reflect.defineMetadata(property_meta_1.PropertyMetaGroup, options.group, target.constructor, propertyKey);
        }
        if (options && options.index) {
            Reflect.defineMetadata(property_meta_1.PropertyMetaIndex, options.index, target.constructor, propertyKey);
        }
    };
}
exports.ProperyDecorator = ProperyDecorator;
function NameDecorator(name) {
    return (target, propertyKey) => {
        if (propertyKey) {
            let keys = helper_1.initMetadata(property_meta_1.PropertyMetaKeys, target.constructor, {});
            keys[propertyKey] = true;
            Reflect.defineMetadata(property_meta_1.PropertyMetaName, name, target.constructor, propertyKey);
        }
        else {
            Reflect.defineMetadata(class_meta_1.ClassMetaName, name, target);
        }
    };
}
exports.NameDecorator = NameDecorator;
function DescriptionDecorator(description) {
    return (target, propertyKey) => {
        if (propertyKey) {
            let keys = helper_1.initMetadata(property_meta_1.PropertyMetaKeys, target.constructor, {});
            keys[propertyKey] = true;
            Reflect.defineMetadata(property_meta_1.PropertyMetaDescription, description, target.constructor, propertyKey);
        }
        else {
            Reflect.defineMetadata(class_meta_1.ClassMetaDescription, description, target);
        }
    };
}
exports.DescriptionDecorator = DescriptionDecorator;
function GroupDecorator(group) {
    return (target, propertyKey) => {
        if (propertyKey) {
            let keys = helper_1.initMetadata(property_meta_1.PropertyMetaKeys, target.constructor, {});
            keys[propertyKey] = true;
            Reflect.defineMetadata(property_meta_1.PropertyMetaGroup, group, target.constructor, propertyKey);
        }
        else {
            Reflect.defineMetadata(class_meta_1.ClassMetaGroup, group, target);
        }
    };
}
exports.GroupDecorator = GroupDecorator;
function IndexDecorator(index) {
    return (target, propertyKey) => {
        let keys = helper_1.initMetadata(property_meta_1.PropertyMetaKeys, target.constructor, {});
        keys[propertyKey] = true;
        Reflect.defineMetadata(property_meta_1.PropertyMetaIndex, index, target.constructor, propertyKey);
    };
}
exports.IndexDecorator = IndexDecorator;
exports.Propery = ProperyDecorator;
exports.Name = NameDecorator;
exports.Description = DescriptionDecorator;
exports.Group = GroupDecorator;
exports.Index = IndexDecorator;
//# sourceMappingURL=decorator.js.map