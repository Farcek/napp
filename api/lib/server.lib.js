"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AModule = exports.AHandler = void 0;
var AHandler = /** @class */ (function () {
    function AHandler(meta, opt) {
        this.meta = meta;
        this.opt = opt;
    }
    AHandler.prototype.getOptions = function () {
        return {
            meta: this.meta,
            befores: this.opt.befores || [],
            validation: this.opt.validation,
            action: this.opt.action
        };
    };
    return AHandler;
}());
exports.AHandler = AHandler;
function buildHandleInstance(v) {
    return {
        str: function () { return '' + v; },
        num: function () { return Number(v); },
        date: function () { return new Date(v); },
        bool: function () { return (v === 'true' || v === '1' || v === 'ok') ? true : false; }
    };
}
var AHandlerWrap = /** @class */ (function () {
    function AHandlerWrap(handler) {
        var $ = handler.getOptions();
        this.meta = $.meta;
        this._validation = $.validation;
        this._action = $.action;
        this._befores = $.befores;
    }
    ;
    Object.defineProperty(AHandlerWrap.prototype, "name", {
        get: function () {
            return this.meta.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AHandlerWrap.prototype, "path", {
        get: function () {
            return this.meta.path || '/' + this.meta.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AHandlerWrap.prototype, "method", {
        get: function () {
            return this.meta.method || 'get';
        },
        enumerable: false,
        configurable: true
    });
    AHandlerWrap.prototype.getBefores = function () {
        return this._befores || [];
    };
    AHandlerWrap.prototype.buildQParam = function (req) {
        var qParam = req.query || {};
        if (this.meta.pipe && this.meta.pipe.query) {
            if (this.meta.pipe.query.request2param) {
                return this.meta.pipe.query.request2param({
                    req: qParam,
                    handle: function (name) { return buildHandleInstance(req.query[name]); },
                    has: function (name) { return name in qParam; }
                });
            }
        }
        return qParam;
    };
    AHandlerWrap.prototype.buildPParam = function (req) {
        var pParam = req.params || {};
        if (this.meta.pipe && this.meta.pipe.path) {
            if (this.meta.pipe.path.request2param) {
                return this.meta.pipe.path.request2param({
                    req: pParam,
                    handle: function (name) { return buildHandleInstance(req.query[name]); },
                    has: function (name) { return name in pParam; }
                });
            }
        }
        return pParam;
    };
    AHandlerWrap.prototype.buildBParam = function (req) {
        var bParam = req.body || {};
        if (this.meta.pipe && this.meta.pipe.body) {
            if (this.meta.pipe.body.request2param) {
                return this.meta.pipe.body.request2param({
                    req: bParam,
                    handle: function (name) { return buildHandleInstance(req.query[name]); },
                    has: function (name) { return name in bParam; }
                });
            }
        }
        return bParam;
    };
    AHandlerWrap.prototype.buildRQParam = function (req) {
        var query = this.buildQParam(req);
        var path = this.buildPParam(req);
        var body = this.buildBParam(req);
        return { query: query, path: path, body: body };
    };
    AHandlerWrap.prototype.action = function (req, res, next, errorHandle) {
        this.doAction(req, res, next)
            .then(function (result) { return res.json(result); })
            .catch(function (err) {
            if (errorHandle) {
                return errorHandle(err, req, res, next);
            }
            next(err);
        });
    };
    AHandlerWrap.prototype.doAction = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params, ctx, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = this.buildRQParam(req);
                        if (this.meta.validation) {
                            this.meta.validation(params);
                        }
                        ctx = {
                            req: req, res: res
                        };
                        if (!this._validation) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._validation(params, ctx)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._action(params, ctx)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AHandlerWrap;
}());
var AModule = /** @class */ (function () {
    function AModule(name, opt) {
        this.name = name;
        this.opt = opt;
        this._handlers = new Map();
    }
    AModule.prototype.register = function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        for (var _a = 0, handlers_1 = handlers; _a < handlers_1.length; _a++) {
            var h = handlers_1[_a];
            this._register(h);
        }
        return this;
    };
    AModule.prototype._register = function (handler) {
        var w = new AHandlerWrap(handler);
        if (this._handlers.has(w.name)) {
            throw new Error("registered \"" + w.name + "\" the handler");
        }
        this._handlers.set(w.name, w);
        return this;
    };
    AModule.prototype.log = function (name, dta) {
        var logger = this.opt.logger;
        if (logger) {
            logger(name, dta);
        }
    };
    AModule.prototype.setup = function (app) {
        var _this = this;
        this.log('setup.module', { name: this.name });
        this._handlers.forEach(function (wrap) {
            _this._setup(app, wrap);
        });
        return app;
    };
    AModule.prototype._setup = function (app, wrap) {
        var name = wrap.name;
        var path = wrap.path;
        var method = wrap.method;
        var errorHandle = this.opt.errorHandle;
        var befores = wrap.getBefores();
        if (method === 'get') {
            app.get(path, befores, function (req, res, next) { return wrap.action(req, res, next, errorHandle); });
        }
        else if (method === 'post') {
            app.post(path, befores, function (req, res, next) { return wrap.action(req, res, next, errorHandle); });
        }
        else if (method === 'del') {
            app.delete(path, befores, function (req, res, next) { return wrap.action(req, res, next, errorHandle); });
        }
        else if (method === 'put') {
            app.put(path, befores, function (req, res, next) { return wrap.action(req, res, next, errorHandle); });
        }
        else {
            throw new Error("not suppoered method. handler = " + name);
        }
        this.log('setup.action', { name: name, method: method, path: path });
    };
    return AModule;
}());
exports.AModule = AModule;
//# sourceMappingURL=server.lib.js.map