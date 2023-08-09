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
const dotenv_1 = __importDefault(require("dotenv"));
const Sqlitex = require("sqlite-x");
const ISHTTPS = false;
const FILE_DBNAME = 'db/hippik_db.sql3';
const PORT_NUM = String(8000);
const HOST_NAME = 'localhost';
const HTTP_SCHEME = ISHTTPS ? 'https' : 'http';
const env = process.env;
const Setting = { PORT: PORT_NUM, DB: FILE_DBNAME, HOST: HOST_NAME, SCHEME: HTTP_SCHEME };
dotenv_1.default.populate(env, Setting);
const db = new Sqlitex(process.env.DB);
db.getAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || isNaN(id) || id < 1)
        id = 1;
    const result = yield db.get `SELECT * FROM accounts WHERE id = ${id}`;
    console.log(JSON.stringify(result));
    return result;
});
db.getAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.get `SELECT * FROM accounts`;
    console.log(JSON.stringify(result));
    return result;
});
db.getContests = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.get `SELECT * FROM contests`;
    console.log(JSON.stringify(result));
    return result;
});
db.getContest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || isNaN(id) || id < 1)
        id = 1;
    const result = yield db.get `SELECT * FROM contests WHERE id = ${id}`;
    console.log(JSON.stringify(result));
    return result;
});
db.postContest = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || isNaN(id) || id < 1)
        id = 1;
    const result = yield db.get `SELECT * FROM contests WHERE id = ${id}`;
    console.log(JSON.stringify(result));
    return result;
});
exports.default = db;
