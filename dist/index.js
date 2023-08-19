"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const { PORT, DB, HOST, SCHEME } = process.env;
server_1.default.listen(Number(PORT), String(HOST), () => {
    console.log(`[DB]: SQLite Server running, using ${DB} as permanent storage`);
    console.log(`[server]: Server is running at ${SCHEME}://${HOST}:${PORT}`);
});
//# sourceMappingURL=index.js.map