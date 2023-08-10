"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite_x_1 = __importDefault(require("sqlite-x"));
dotenv_1.default.config();
const ISHTTPS = process.env.HTTPS ? true : false;
const HTTP_SCHEME = ISHTTPS ? 'https' : 'http';
const FILE_DBNAME = 'db/hippik.db';
const PORT_NUM = String(8000);
const HOST_NAME = 'localhost';
const env = process.env;
const envSettings = {
    PORT: PORT_NUM,
    DB: FILE_DBNAME,
    HOST: HOST_NAME,
    SCHEME: HTTP_SCHEME
};
dotenv_1.default.populate(env, envSettings);
const db = new sqlite_x_1.default(String(process.env.DB));
exports.default = db;
