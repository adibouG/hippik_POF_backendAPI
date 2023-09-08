"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sessions_class_1 = __importDefault(require("../models/sessions.class"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/files', express_1.default.static(path_1.default.join(__dirname, 'files')));
app.set('authCheckMiddleware', (req, res, next) => {
    const headr = req.get('authorization');
    if (headr) {
        const b64cred = headr.split(' ').at(1);
        const auth = decodeURIComponent(Buffer.from(b64cred, 'base64').toString()).split(':');
        const userId = (auth.at(0)) || '';
        const sessionId = auth.at(1) || '';
        const sessionKey = `${userId}::${sessionId}`;
        //checkSession 
        if (sessions_class_1.default.sessionsList.isValid(sessionKey)) {
            res.locals = { userId, sessionId };
            return next();
        }
    }
    const err = new Error('invalid user session');
    throw err;
});
const errorHandler = (err, req, res) => {
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
    if (err.message && err.message.includes('session'))
        res.set('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');
    return res.status(500).send('Something broke!');
};
exports.errorHandler = errorHandler;
exports.default = app;
//# sourceMappingURL=index.js.map