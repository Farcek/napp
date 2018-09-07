"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.PropertyMetaName = "design:propery:name";
exports.PropertyMetaType = "design:propery:type";
exports.PropertyMetaIndex = "design:propery:index";
exports.PropertyMetaDescription = "design:propery:description";
exports.PropertyMetaGroup = "design:propery:group";
exports.PropertyMetaKeys = "design:property:names[]";
class PropertyMeta {
    constructor() {
        this.Type = common_1.PropertyType.Primary;
    }
}
exports.PropertyMeta = PropertyMeta;
//# sourceMappingURL=property.meta.js.map