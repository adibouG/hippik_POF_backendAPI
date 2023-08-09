"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const contests_1 = __importDefault(require("./contests"));
const app_1 = __importDefault(require("../app"));
app_1.default.use(contests_1.default);
app_1.default.use(users_1.default);
exports.default = app_1.default;
