"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertiesError {
    constructor(message) {
        this.properties = {};
        this.message = message;
    }
    addPropertyMessage(property, message) {
        let messages = this.properties[property] || (this.properties[property] = []);
        messages.push(message);
    }
    map(handle) {
        return Object.keys(this.properties)
            .map((property) => handle(property, this.properties[property]));
    }
    mapPropery(property, handle) {
        if (property in this.properties) {
            return this.properties[property].map((message) => handle(message));
        }
        throw new ReferenceError(`not found property "${property}"`);
    }
}
exports.PropertiesError = PropertiesError;
//# sourceMappingURL=properties.error.js.map