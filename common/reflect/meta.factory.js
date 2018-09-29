"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReflectMetaFactory;
(function (ReflectMetaFactory) {
    function ClassDecorator(handle) {
        return ((target) => {
            handle(target);
        });
    }
    ReflectMetaFactory.ClassDecorator = ClassDecorator;
    function PropertyDecorator(handle) {
        return ((target, propertyKey) => {
            handle(target.constructor, propertyKey);
        });
    }
    ReflectMetaFactory.PropertyDecorator = PropertyDecorator;
    function ClassPropertyDecorator(handle) {
        return ((target, propertyKey) => {
            if (propertyKey) {
                handle(target);
            }
            else {
                handle(target.constructor, propertyKey);
            }
        });
    }
    ReflectMetaFactory.ClassPropertyDecorator = ClassPropertyDecorator;
})(ReflectMetaFactory = exports.ReflectMetaFactory || (exports.ReflectMetaFactory = {}));
//# sourceMappingURL=meta.factory.js.map