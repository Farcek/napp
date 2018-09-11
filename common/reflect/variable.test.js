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
class FooClass {
    constructor() {
        this.int1 = 0;
    }
}
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Number)
], FooClass.prototype, "int1", void 0);
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
let VariableTestClass = class VariableTestClass {
    factoryVariableMetaAsPrimitive() {
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(String);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check String - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.String, " check String - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("string");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check string - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.String, " check string - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Number);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check Number - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Int, " check Number - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("int");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check int - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Int, " check int - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("float");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check float - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Float, " check float - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Boolean);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check Boolean - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Boolean, " check Boolean - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("boolean");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check boolean - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Boolean, " check boolean - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Date);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check Date - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Date, " check Date - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("date");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check date - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Date, " check date - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(Symbol);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check Symbol - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Symbol, " check Symbol - Refrence");
        }
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta("symbol");
            chai_1.assert.equal(m.Type, variable_1.VariableType.Primitive, " check symbol - Type");
            chai_1.assert.equal(m.Refrence, variable_1.VariablePrimitiveType.Symbol, " check symbol - Refrence");
        }
    }
    factoryVariableMetaAsComplex() {
        {
            let m = variable_helper_1.ReflectVariable.factoryVariableMeta(BarClass);
            chai_1.assert.equal(m.Type, variable_1.VariableType.Complex, "check Any class - Type");
            chai_1.assert.equal(m.Refrence, BarClass, " check Any class - Refrence");
        }
    }
    decratorStr1() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "str1");
        chai_1.assert.equal(m && m.Type, variable_1.VariableType.Primitive, "check Any class - Type");
        chai_1.assert.equal(m && m.Refrence, variable_1.VariablePrimitiveType.String, " check Any class - Refrence");
    }
    decratorStr3() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(BarClass, "str3");
        console.log(m);
        chai_1.assert.equal(m && m.Type, variable_1.VariableType.Primitive, "check Any class - Type");
        chai_1.assert.equal(m && m.Refrence, variable_1.VariablePrimitiveType.String, " check Any class - Refrence");
    }
    decratorNumber() {
        let m = variable_helper_1.ReflectVariable.getVariableMeta(FooClass, "int1");
        chai_1.assert.equal(m && m.Type, variable_1.VariableType.Primitive, "check FooClass.int1 - Type");
        chai_1.assert.equal(m && m.Refrence, variable_1.VariablePrimitiveType.Int, "check FooClass.int1 - Refrence");
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
    mocha_typescript_1.only,
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
VariableTestClass = __decorate([
    mocha_typescript_1.suite,
    mocha_typescript_1.only
], VariableTestClass);
exports.VariableTestClass = VariableTestClass;
//# sourceMappingURL=variable.test.js.map