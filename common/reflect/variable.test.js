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
const variable_decorator_1 = require("./variable.decorator");
const variable_helper_1 = require("./variable.helper");
const variable_1 = require("./variable");
let FooClass = class FooClass {
    constructor(as) {
        this.as = as;
        this.int1 = 0;
        this.a1 = [];
    }
    m1(a, b) {
        console.log(1);
        return "";
    }
    m2(...a) {
        console.log(1);
    }
};
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Number)
], FooClass.prototype, "int1", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Promise)
], FooClass.prototype, "t1", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Array)
], FooClass.prototype, "a1", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Array)
], FooClass.prototype, "a2", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", String)
], FooClass.prototype, "m1", null);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Promise)
], FooClass.prototype, "t2", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Promise)
], FooClass.prototype, "t3", void 0);
FooClass = __decorate([
    name_decorator_1.Name("aa"),
    __metadata("design:paramtypes", [String])
], FooClass);
class BarClass {
}
__decorate([
    name_decorator_1.NameDecorator("fullname"),
    __metadata("design:type", String)
], BarClass.prototype, "str1", void 0);
__decorate([
    property_decorator_1.Property({ type: String }),
    __metadata("design:type", String)
], BarClass.prototype, "str2", void 0);
__decorate([
    variable_decorator_1.Type(String),
    __metadata("design:type", Object)
], BarClass.prototype, "str3", void 0);
__decorate([
    property_decorator_1.Property({ type: "string" }),
    __metadata("design:type", Object)
], BarClass.prototype, "str4", void 0);
__decorate([
    variable_decorator_1.Type(String),
    property_decorator_1.Property({ type: "int" }),
    __metadata("design:type", Object)
], BarClass.prototype, "str5", void 0);
__decorate([
    variable_decorator_1.Type(String, true),
    __metadata("design:type", Object)
], BarClass.prototype, "arr1", void 0);
__decorate([
    property_decorator_1.Property({ type: FooClass, isArray: true }),
    __metadata("design:type", Array)
], BarClass.prototype, "arr2", void 0);
let VariableTestClass = class VariableTestClass {
    factoryVariableMetaAsPrimitive() {
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(String);
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.String, "check String");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("string");
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.String, "check String");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Number);
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Int, "check int");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("int");
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Int, "check int");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("float");
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Float, "check float");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Boolean);
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Boolean, "check bool");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("boolean");
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Boolean, "check bool");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Date);
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Date, "check date");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("date");
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Date, "check date");
        }
    }
    factoryVariableMetaAsComplex() {
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(BarClass);
            chai_1.assert.equal(m.Type, variable_1.VariablePrimitiveType.Custom, "check Any class - Type");
            chai_1.assert.equal(m.TypeName, "BarClass", " check Any class - typename");
            chai_1.assert.equal(m.TypeRef, BarClass, " check Any class - Refrence");
        }
    }
    decratorStr1() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "str1");
        chai_1.assert.equal(m && m.Type, variable_1.VariablePrimitiveType.String, "check Any class - Type");
        chai_1.assert.equal(m && m.TypeRef, String, " check Any class - Refrence");
    }
    decratorStr3() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "str3");
        console.log(m);
        chai_1.assert.equal(m && m.Type, variable_1.VariablePrimitiveType.String, "check Any class - Type");
        chai_1.assert.equal(m && m.TypeRef, String, " check Any class - Refrence");
    }
    decratorNumber() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(FooClass, "int1");
        chai_1.assert.equal(m && m.Type, variable_1.VariablePrimitiveType.Int, "check FooClass.int1 - Type");
        chai_1.assert.equal(m && m.TypeRef, Number, "check FooClass.int1 - Refrence");
        chai_1.assert.equal(m && m.TypeName, "int", "check FooClass.int1 - Typename");
    }
    decratorArray() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "arr1");
        chai_1.assert.equal(m && m.Type, variable_1.VariablePrimitiveType.Array, "check BarClass.arr1 - Type");
        chai_1.assert.equal(m && m.TypeRef, Array, "check BarClass.arr1 - Refrence");
        chai_1.assert.equal(m && m.IsArray, true, "check BarClass.arr1 - isArray");
    }
    decratorArray2() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "arr2");
        chai_1.assert.equal(m && m.Type, variable_1.VariablePrimitiveType.Array, "check BarClass.arr2 - Type");
        chai_1.assert.equal(m && m.TypeRef, Array, "check BarClass.arr2 - Refrence");
        chai_1.assert.equal(m && m.IsArray, true, "check BarClass.arr2 - isArray");
        chai_1.assert.equal(m && m.ArrayElement && m.ArrayElement.TypeRef, FooClass, "check BarClass.arr2 - array element");
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "factoryVariableMetaAsPrimitive", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "factoryVariableMetaAsComplex", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "decratorStr1", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "decratorStr3", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "decratorNumber", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "decratorArray", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariableTestClass.prototype, "decratorArray2", null);
VariableTestClass = __decorate([
    mocha_typescript_1.suite
], VariableTestClass);
exports.VariableTestClass = VariableTestClass;
//# sourceMappingURL=variable.test.js.map