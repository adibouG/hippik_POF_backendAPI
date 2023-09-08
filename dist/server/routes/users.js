"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app_1 = __importDefault(require("../app"));
const Controllers = __importStar(require("../controllers"));
const user_class_1 = require("../models/user.class");
const sessions_class_1 = __importStar(require("../models/sessions.class"));
const utils_1 = require("../utils/utils");
const userRouter = express_1.default.Router();
const checkAndRemovePwdData = (account /*, i:number, source: User[]*/) => {
    for (const k in account) {
        if (k === 'pwd' || k === 'salt') {
            let ac = account;
            delete account.pwd;
            delete account.salt;
            return account;
        }
    }
};
userRouter.route('/api/users')
    .all(app_1.default.get('authCheckMiddleware'))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.getAccounts();
    console.log(data);
    data.map((el, id, mod) => checkAndRemovePwdData(el));
    console.log(data);
    return res.send(data);
}));
userRouter.route('/api/users/:id')
    .all(app_1.default.get('authCheckMiddleware'))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.getAccount(Number(id));
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.updateAccount(req.body);
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.deleteAccount(Number(id));
    return res.send(data);
}));
userRouter.route('/api/logout')
    .all(app_1.default.get('authCheckMiddleware'))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = req.body;
        let { userId, sessionId } = res.locals;
        const id = userdata.id;
        let userSessionId = `${userId}::${sessionId}`;
        //   if (userId !=  id)   console.log (`userId ${userId} !=  id ${id}`)
        if (sessions_class_1.default.sessionsList.has(userSessionId))
            sessions_class_1.default.endSession(userSessionId);
        res.set('Clear-Site-userSessions', '"cache", "cookies", "storage", "executionContexts"');
        return res.end();
    }
    catch (e) {
        res.set('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');
        res.set('Refresh', '1');
        return res.status(400).send(e);
    }
}));
userRouter.route('/api/login')
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    try {
        if (!user.length)
            throw new Error('no valid values');
        const isEmail = String(user).includes('@');
        const data = yield Controllers.getAccountByNameOrMail(user, isEmail);
        if (!data)
            throw new Error('user not found');
        if ((0, utils_1.comparePwd)(pwd, data.salt, data.pwd)) {
            const userObj = new user_class_1.User(data); // .id, , , data.email, data.name, data.createdBy, data.status, createDate, modDate);
            checkAndRemovePwdData(userObj);
            const sessionData = new sessions_class_1.UserSession(userObj.id, req.ip);
            if (sessions_class_1.default.sessionsList.addSession(sessionData)) {
                res.cookie('user', JSON.stringify(userObj));
                res.cookie('sessionid', sessionData.sessionid);
                return res.send(userObj);
            }
            else {
            }
        }
        else
            throw new Error('invalid user/pwd');
    }
    catch (e) {
        return res.status(400).send(e);
    }
}));
userRouter.route('/api/users/register')
    .all((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    next();
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, email, pwd, isAdmin } = req.body;
    try {
        if ((!user.length && !email.length) || !pwd.length)
            throw new Error('missing mandatory values');
        const isEmail = email && String(email).includes('@');
        let isOk = true; // flag to track if user values are good
        //email is 1st unique chek 
        if (isEmail) {
            const data = yield Controllers.getAccountByNameOrMail(email, isEmail);
            if (data) {
                isOk = false;
                throw new Error('email already exist');
            }
        }
        // name is 2nd check
        let name = user && user.length ? user : email;
        const data = yield Controllers.getAccountByNameOrMail(name, false);
        if (data) {
            isOk = false;
            throw new Error('name already exist');
        }
        if (isOk) {
            //go for the pwd   
            const userPwd = (0, utils_1.genrateSaltHashPassword)(pwd); //TODO : move in controller
            const userObj = new user_class_1.UserWithCred(data, userPwd.passwordHash, userPwd.salt);
            const saveUser = yield Controllers.createAccount(userObj);
            if (saveUser) {
                const data = yield Controllers.getAccountByNameOrMail(userObj.name, false);
                const newAccount = new user_class_1.User(data);
                return res.send(newAccount);
            }
            return res.status(500).send('unknow issue while registering the account');
        }
        else
            throw new Error('invalid user/pwd');
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}));
exports.default = userRouter;
//# sourceMappingURL=users.js.map