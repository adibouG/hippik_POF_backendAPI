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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LOG_FILE = exports.LOG_LEVEL = exports.APP_ENV = exports.Env = exports.ConsoleLogger = void 0;
const NO_OP = (message, ...optionalParams) => { };
class LogFile {
    constructor(file) {
        this.fileReady = false;
        this.filename = file.filename;
        navigator.storage.getDirectory()
            .then(dir => dir.getFileHandle(this.filename, { create: true, }))
            .then(handle => this.filehandle = handle)
            .then(() => this.fileReady = true)
            .catch(err => err);
    }
    // get a new file handler 
    getHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = yield navigator.storage.getDirectory();
            const fileHandle = yield dir.getFileHandle(this.filename, { create: true, });
            return this.filehandle = fileHandle;
        });
    }
    //write to file
    writeLogs(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.fileReady) {
                    const handle = this.filehandle;
                    if (window.isSecureContext) {
                        const stream = yield handle.createWritable({ keepExistingData: true });
                        const writer = stream ? stream.getWriter() : null;
                        if (!writer)
                            throw new Error('get file writer error');
                        const encoder = new TextEncoder();
                        const encoded = encoder.encode(text.join('\n'));
                        for (const part in encoded) {
                            yield (writer === null || writer === void 0 ? void 0 : writer.ready);
                            yield (writer === null || writer === void 0 ? void 0 : writer.write(part));
                        }
                        yield (writer === null || writer === void 0 ? void 0 : writer.ready);
                        yield (writer === null || writer === void 0 ? void 0 : writer.close());
                    }
                    return true;
                }
                return false;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
/*
* Logger which outputs to the browser console and a file if specified (file should be sent to server at session end)
*/
class ConsoleLogger {
    constructor(options) {
        const { level, file } = options || {};
        if (file) {
            this.file = typeof file === 'string' ? new LogFile({ filename: file + '_' + Date.now() }) : file;
            this.send = () => __awaiter(this, void 0, void 0, function* () {
                //TODO: send file to serverr
            });
        }
        this.error = console.error.bind(console);
        if (level === 'error') {
            this.warn = NO_OP;
            this.log = NO_OP;
            return;
        }
        this.warn = console.warn.bind(console);
        if (level === 'warn') {
            this.log = NO_OP;
            return;
        }
        this.log = console.log.bind(console);
    }
}
exports.ConsoleLogger = ConsoleLogger;
/*
* The App environment
*/
var Env;
(function (Env) {
    Env["development"] = "dev";
    Env["production"] = "prod";
})(Env || (exports.Env = Env = {}));
;
exports.APP_ENV = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'prod' ? Env.production : Env.development;
exports.LOG_LEVEL = exports.APP_ENV === Env.production ? 'warn' : 'log';
exports.LOG_FILE = process.env.LOG_FILE;
exports.logger = new ConsoleLogger({ level: exports.LOG_LEVEL, file: exports.LOG_FILE });
//# sourceMappingURL=logger.class.js.map