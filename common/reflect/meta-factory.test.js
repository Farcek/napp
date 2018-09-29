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
const meta_factory_1 = require("./meta.factory");
class FooClass {
}
function classDecorator1(aa) {
    return meta_factory_1.ReflectDecoratorFactory.ClassDecorator((target) => {
        target.vv = aa;
    });
}
function properyDecorator1(aa) {
    return meta_factory_1.ReflectDecoratorFactory.PropertyDecorator((target, property) => {
        ss[property] = aa;
    });
}
let ss = {
    cc: ''
};
let FooClass11 = class FooClass11 {
    constructor() {
        this.cc = 3;
    }
};
FooClass11.vv = 32;
__decorate([
    properyDecorator1("nostatic cc"),
    __metadata("design:type", Number)
], FooClass11.prototype, "cc", void 0);
FooClass11 = __decorate([
    classDecorator1(11)
], FooClass11);
let DecoderFactoryClass = class DecoderFactoryClass {
    reflect() {
        Reflect.defineMetadata("aa", 23, FooClass);
        Reflect.defineMetadata("aa", 33, FooClass);
        let r = Reflect.getMetadata("aa", FooClass);
        chai_1.assert.equal(r, 33);
    }
    classFactory() {
        chai_1.assert.equal(FooClass11.vv, 11);
    }
    propertyFactory() {
        chai_1.assert.equal(ss.cc, "nostatic cc");
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecoderFactoryClass.prototype, "reflect", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecoderFactoryClass.prototype, "classFactory", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecoderFactoryClass.prototype, "propertyFactory", null);
DecoderFactoryClass = __decorate([
    mocha_typescript_1.suite,
    mocha_typescript_1.only
], DecoderFactoryClass);
exports.DecoderFactoryClass = DecoderFactoryClass;
//# sourceMappingURL=meta-factory.test.js.map