"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const name_decorator_1 = require("./name.decorator");
const property_decorator_1 = require("./property.decorator");
const property_helper_1 = require("./property.helper");
class Foo2Class {
}
__decorate([
    name_decorator_1.NameDecorator("fullname"),
    __metadata("design:type", String)
], Foo2Class.prototype, "pp", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", String)
], Foo2Class.prototype, "pp2", void 0);
let PropertyTestClass = class PropertyTestClass {
    getProperies() {
        let p = property_helper_1.ReflectProperty.GetProperiesMeta(Foo2Class).Names;
        chai_1.assert.isTrue(p.pp);
        chai_1.assert.isTrue(p.pp2);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyTestClass.prototype, "getProperies", null);
PropertyTestClass = __decorate([
    mocha_typescript_1.suite
], PropertyTestClass);
exports.PropertyTestClass = PropertyTestClass;
//# sourceMappingURL=property.test.js.map