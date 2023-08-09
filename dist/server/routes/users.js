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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../utils"));
const userRouter = express_1.default.Router();
userRouter.route('/api/users')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield utils_1.default.getAccount();
    return res.send(data);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield utils_1.default.getAccount();
    return res.send(data);
}));
userRouter.route('/api/users/:id')
    .all((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //check token 
    //log request
    if (1)
        next();
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield utils_1.default.getAccount();
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield utils_1.default.getAccount();
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield utils_1.default.getAccount();
    return res.send(data);
}));
exports.default = userRouter;
