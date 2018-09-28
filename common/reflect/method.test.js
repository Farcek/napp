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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mocha_typescript_1 = require("mocha-typescript");
const property_decorator_1 = require("./property.decorator");
class Foo2Class {
    m1() {
        return 11;
    }
    m2() {
        return 11;
    }
    m22() {
        return 11;
    }
    m3() {
        return __awaiter(this, void 0, void 0, function* () {
            return 11;
        });
    }
    m4() {
        return __awaiter(this, void 0, void 0, function* () {
            return 11;
        });
    }
}
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", String)
], Foo2Class.prototype, "pp2", void 0);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Foo2Class.prototype, "m2", null);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Number)
], Foo2Class.prototype, "m22", null);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Foo2Class.prototype, "m3", null);
__decorate([
    property_decorator_1.Property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Foo2Class.prototype, "m4", null);
let MethodTestClass = class MethodTestClass {
    getNameMetaClass() {
        let r = Reflect.getMetadataKeys(Foo2Class.prototype, "m1");
        console.log(r);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MethodTestClass.prototype, "getNameMetaClass", null);
MethodTestClass = __decorate([
    mocha_typescript_1.suite
], MethodTestClass);
exports.MethodTestClass = MethodTestClass;
//# sourceMappingURL=method.test.js.map