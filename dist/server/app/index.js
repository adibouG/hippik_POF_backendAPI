"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/files', express_1.default.static(path_1.default.join(__dirname, 'files')));
app.set('userSessions', {});
app.use((err, req, res) => {
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});
exports.default = app;
//# sourceMappingURL=index.js.map