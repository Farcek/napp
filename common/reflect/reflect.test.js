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
const _1 = require(".");
const decorator_1 = require("./decorator");
const property_meta_1 = require("./property.meta");
const class_meta_1 = require("./class.meta");
class Work {
    constructor() {
        this.name = "";
        this.desc = "";
    }
}
var Gender;
(function (Gender) {
    Gender[Gender["Mr"] = 0] = "Mr";
    Gender[Gender["Mss"] = 1] = "Mss";
})(Gender || (Gender = {}));
let TestClass = class TestClass {
    constructor() {
        this.name = "farcek";
        this.gender = Gender.Mr;
        this.age = 35;
    }
};
__decorate([
    _1.Propery({ name: "fullname" }),
    __metadata("design:type", String)
], TestClass.prototype, "name", void 0);
__decorate([
    _1.Propery(),
    decorator_1.Index(10),
    __metadata("design:type", Number)
], TestClass.prototype, "gender", void 0);
__decorate([
    _1.Propery(),
    decorator_1.Description("hunii nas"),
    __metadata("design:type", Number)
], TestClass.prototype, "age", void 0);
__decorate([
    _1.Propery(),
    decorator_1.Name("ajil"),
    __metadata("design:type", Work)
], TestClass.prototype, "work", void 0);
__decorate([
    _1.Propery(),
    decorator_1.Group("other"),
    __metadata("design:type", Object)
], TestClass.prototype, "any0", void 0);
TestClass = __decorate([
    decorator_1.Name("Test class")
], TestClass);
let ReflectClass = class ReflectClass {
    name() {
        let name = Reflect.getMetadata(class_meta_1.ClassMetaName, TestClass);
        chai_1.assert.equal("Test class", name);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectClass.prototype, "name", null);
ReflectClass = __decorate([
    mocha_typescript_1.suite
], ReflectClass);
let ReflectPropery = class ReflectPropery {
    property() {
        let members = Reflect.getMetadata(_1.PropertyMetaKeys, TestClass);
        chai_1.assert.isOk(members.name);
        chai_1.assert.isOk(members.gender);
        chai_1.assert.isOk(members.age);
        chai_1.assert.isOk(members.work);
    }
    propertyName1() {
        let name = Reflect.getMetadata(_1.PropertyMetaName, TestClass, "name");
        chai_1.assert.equal("fullname", name);
    }
    propertyName2() {
        let name = Reflect.getMetadata(_1.PropertyMetaName, TestClass, "work");
        chai_1.assert.equal("ajil", name);
    }
    propertyType() {
        let name = Reflect.getMetadata(_1.PropertyMetaName, TestClass, "name");
        chai_1.assert.equal("fullname", name);
    }
    propertyDescription() {
        let desc = Reflect.getMetadata(property_meta_1.PropertyMetaDescription, TestClass, "age");
        chai_1.assert.equal("hunii nas", desc);
    }
    propertyIndex() {
        let idx = Reflect.getMetadata(property_meta_1.PropertyMetaIndex, TestClass, "gender");
        chai_1.assert.equal(10, idx);
    }
    propertyGroup() {
        let g = Reflect.getMetadata(property_meta_1.PropertyMetaGroup, TestClass, "any0");
        chai_1.assert.equal("other", g);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "property", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "propertyName1", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "propertyType", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "propertyDescription", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "propertyIndex", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReflectPropery.prototype, "propertyGroup", null);
ReflectPropery = __decorate([
    mocha_typescript_1.suite
], ReflectPropery);
//# sourceMappingURL=reflect.test.js.map