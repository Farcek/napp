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
const name_helper_1 = require("./name.helper");
const property_decorator_1 = require("./property.decorator");
let Foo1Class = class Foo1Class {
};
Foo1Class = __decorate([
    name_decorator_1.Name("Foo 1 class")
], Foo1Class);
class Foo2Class extends Foo1Class {
}
__decorate([
    name_decorator_1.NameDecorator("fullname"),
    __metadata("design:type", String)
], Foo2Class.prototype, "pp", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", String)
], Foo2Class.prototype, "pp2", void 0);
let NameTestClass = class NameTestClass {
    getNameMetaClass() {
        let r1 = name_helper_1.ReflectName.getNameMeta(Foo1Class);
        if (r1) {
            chai_1.assert.equal(r1.Name, "Foo 1 class", "decration seted");
        }
        console.log(Foo2Class, Foo2Class.prototype);
        let r2 = name_helper_1.ReflectName.getNameMeta(Foo2Class);
        let r3 = name_helper_1.ReflectName.getNameMeta(Foo2Class);
        chai_1.assert.equal(r2 && r2.Name, "Foo2Class", "one instane seted");
        chai_1.assert.isTrue(r2 === r3, "one instane seted");
    }
    getNameMetaPropery() {
        let r1 = name_helper_1.ReflectName.getNameMeta(Foo2Class, "pp");
        chai_1.assert.equal(r1 && r1.Name, "fullname", "basic name");
        let r2 = name_helper_1.ReflectName.getNameMeta(Foo2Class, "pp2");
        chai_1.assert.equal(r2 && r2.Name, "pp2", "basic name");
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NameTestClass.prototype, "getNameMetaClass", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NameTestClass.prototype, "getNameMetaPropery", null);
NameTestClass = __decorate([
    mocha_typescript_1.suite
], NameTestClass);
exports.NameTestClass = NameTestClass;
//# sourceMappingURL=name.test.js.map