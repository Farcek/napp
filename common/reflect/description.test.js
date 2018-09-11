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
const property_decorator_1 = require("./property.decorator");
const description_decorator_1 = require("./description.decorator");
const description_helper_1 = require("./description.helper");
let BarClass = class BarClass {
};
__decorate([
    description_decorator_1.Description("p"),
    __metadata("design:type", String)
], BarClass.prototype, "pp", void 0);
__decorate([
    property_decorator_1.Property({ description: "p2" }),
    __metadata("design:type", String)
], BarClass.prototype, "pp2", void 0);
BarClass = __decorate([
    description_decorator_1.Description("Bar")
], BarClass);
let DescriptionTestClass = class DescriptionTestClass {
    DescriptionCheck() {
        let r1 = description_helper_1.ReflectDescription.getMeta(BarClass);
        if (r1) {
            chai_1.assert.equal(r1.Description, "Bar", "decration seted");
        }
        let r2 = description_helper_1.ReflectDescription.getMeta(BarClass, "pp");
        let r3 = description_helper_1.ReflectDescription.getMeta(BarClass, "pp2");
        chai_1.assert.equal(r2 && r2.Description, "p", "Description set");
        chai_1.assert.equal(r3 && r3.Description, "p2", "Property set");
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DescriptionTestClass.prototype, "DescriptionCheck", null);
DescriptionTestClass = __decorate([
    mocha_typescript_1.suite
], DescriptionTestClass);
exports.DescriptionTestClass = DescriptionTestClass;
//# sourceMappingURL=description.test.js.map