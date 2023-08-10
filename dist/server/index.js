"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routes"));
app_1.default.use(routes_1.default.contestRouter);
app_1.default.use(routes_1.default.userRouter);
exports.default = app_1.default;
