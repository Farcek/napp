"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$$MetakeyProperties = "design:properties";
class PropertiesMeta {
    constructor() {
        this.Level = 0;
        this.Names = {};
    }
    add(name) {
        this.Names[name] = true;
    }
    map(callbackfn) {
        return Object.keys(this.Names).map(callbackfn);
    }
}
exports.PropertiesMeta = PropertiesMeta;
//# sourceMappingURL=property.meta.js.map