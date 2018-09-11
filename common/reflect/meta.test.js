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
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const meta_1 = require("./meta");
class FooMeta {
    constructor(Level, v) {
        this.Level = Level;
        this.v = v;
    }
}
class FooClass {
}
let MetaTestClass = class MetaTestClass {
    before() {
        meta_1.ReflectMeta.DeleteMeta("foo", FooClass);
        meta_1.ReflectMeta.DeleteMeta("foo", FooClass, "pp");
    }
    SetMetaBasic() {
        let meta = new FooMeta(2);
        let meta2 = new FooMeta(2);
        let meta3 = new FooMeta(1);
        let r1 = meta_1.ReflectMeta.SetMeta("foo", meta, FooClass);
        chai_1.assert.isTrue(r1);
        let r2 = meta_1.ReflectMeta.SetMeta("foo", meta2, FooClass);
        chai_1.assert.isTrue(r2);
        let r3 = meta_1.ReflectMeta.SetMeta("foo", meta3, FooClass);
        chai_1.assert.isFalse(r3);
    }
    SetMetaCheckValues() {
        let m1 = new FooMeta(1, "a");
        let m2 = new FooMeta(2, "b");
        let r1 = meta_1.ReflectMeta.SetMeta("foo", m1, FooClass);
        let r2 = meta_1.ReflectMeta.SetMeta("foo", m2, FooClass);
        chai_1.assert.isTrue(r1, " first set");
        chai_1.assert.isTrue(r2, " secont set");
        let m = meta_1.ReflectMeta.GetMeta("foo", FooClass);
        if (m) {
            chai_1.assert.equal(m.v, "b");
        }
        else {
            throw new Error("SetMeta not work");
        }
    }
    SetMetaCheckProperty() {
        let m1 = new FooMeta(1, "a");
        let m2 = new FooMeta(2, "b");
        let m3 = new FooMeta(1, "c");
        // check null
        let r1 = meta_1.ReflectMeta.GetMeta("foo", FooClass, "pp");
        chai_1.assert.isNull(r1);
        // check first
        let b2 = meta_1.ReflectMeta.SetMeta("foo", m1, FooClass, "pp");
        let r2 = meta_1.ReflectMeta.GetMeta("foo", FooClass, "pp");
        chai_1.assert.isTrue(b2);
        chai_1.assert.isNotNull(r2);
        chai_1.assert.equal(r2 && r2.v, "a");
        // check secont
        let b3 = meta_1.ReflectMeta.SetMeta("foo", m2, FooClass, "pp");
        let r3 = meta_1.ReflectMeta.GetMeta("foo", FooClass, "pp");
        chai_1.assert.isTrue(b3);
        chai_1.assert.isNotNull(r3);
        chai_1.assert.equal(r3 && r3.v, "b");
        // check secont
        let b4 = meta_1.ReflectMeta.SetMeta("foo", m3, FooClass, "pp");
        let r4 = meta_1.ReflectMeta.GetMeta("foo", FooClass, "pp");
        chai_1.assert.isFalse(b4);
        chai_1.assert.isNotNull(r4);
        chai_1.assert.equal(r4 && r4.v, "b");
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetaTestClass.prototype, "SetMetaBasic", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetaTestClass.prototype, "SetMetaCheckValues", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetaTestClass.prototype, "SetMetaCheckProperty", null);
MetaTestClass = __decorate([
    mocha_typescript_1.suite
], MetaTestClass);
exports.MetaTestClass = MetaTestClass;
//# sourceMappingURL=meta.test.js.map