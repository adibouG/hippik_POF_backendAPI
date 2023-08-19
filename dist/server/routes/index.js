"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const contests_1 = __importDefault(require("./contests"));
const AppRoutes = { userRouter: users_1.default, contestRouter: contests_1.default };
exports.default = AppRoutes;
//# sourceMappingURL=index.js.map