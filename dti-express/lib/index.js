"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerHandle {
    constructor(Cls) {
        this.Cls = Cls;
    }
    action(handle) {
    }
}
exports.ServerHandle = ServerHandle;
function factory(Cls) {
    return new ServerHandle(Cls);
}
exports.factory = factory;
