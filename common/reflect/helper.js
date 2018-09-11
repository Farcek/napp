"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initMetadata(key, target, defaultValue) {
    let meta = Reflect.getMetadata(key, target);
    if (meta) {
        return meta;
    }
    Reflect.defineMetadata(key, defaultValue, target);
    return defaultValue;
}
exports.initMetadata = initMetadata;
//# sourceMappingURL=helper.js.map