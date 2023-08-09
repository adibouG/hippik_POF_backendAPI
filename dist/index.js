"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
console.log(process.env.DB);
const { PORT, DB, HOST, SCHEME } = process.env;
server_1.default.listen(Number(PORT), String(HOST), () => {
    console.log(`[server]: Server is running at ${SCHEME}://${HOST}:${PORT}`);
});
