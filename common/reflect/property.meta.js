"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("./meta");
exports.$$MetakeyProperties = "design:properties";
class PropertiesMeta extends meta_1.BaseMeta {
    constructor() {
        super(...arguments);
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