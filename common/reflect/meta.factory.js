"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReflectDecoratorFactory;
(function (ReflectDecoratorFactory) {
    function ClassDecorator(handle) {
        return ((target) => {
            handle(target);
        });
    }
    ReflectDecoratorFactory.ClassDecorator = ClassDecorator;
    function PropertyDecorator(handle) {
        return ((target, propertyKey) => {
            handle(target.constructor, propertyKey);
        });
    }
    ReflectDecoratorFactory.PropertyDecorator = PropertyDecorator;
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
    ReflectDecoratorFactory.ClassPropertyDecorator = ClassPropertyDecorator;
})(ReflectDecoratorFactory = exports.ReflectDecoratorFactory || (exports.ReflectDecoratorFactory = {}));
//# sourceMappingURL=meta.factory.js.map