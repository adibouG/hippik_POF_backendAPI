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
const dotenv_1 = __importDefault(require("dotenv"));
const Sqlitex = require("sqlite-x");
const FILE_NAME = "./db/hippik_db.sql3";
const PORT_NUM = String(8000);
const env = process.env;
const Setting = { PORT: PORT_NUM, DB: FILE_NAME };
dotenv_1.default.populate(env, Setting);
const app = (0, express_1.default)();
const userRouter = express_1.default.Router();
const contestRouter = express_1.default.Router();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const db = new Sqlitex("./db/hippik_db.sql3");
const getAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.get `SELECT * FROM accounts WHERE id = 1`;
    console.log(JSON.stringify(result));
    return result;
});
//getAccount();
userRouter.route('/api/users')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
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
    const data = yield getAccount();
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}));
contestRouter.route('/api/contests')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}));
contestRouter.route('/api/contests/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield getAccount();
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAccount();
    return res.send(data);
}));
app.use(contestRouter);
app.use(userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT_NUM, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT_NUM}`);
});
