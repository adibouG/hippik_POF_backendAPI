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
const Controllers = __importStar(require("../controllers"));
const user_class_1 = __importDefault(require("../models/user.class"));
const userRouter = express_1.default.Router();
userRouter.route('/api/users')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.getAccounts();
    return res.send(data);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.createAccount(req.body);
    return res.send(data);
}));
userRouter.route('/api/users/:id')
    .all((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //check token 
    //log request
    if (1)
        next();
    else
        throw new Error();
}))
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
userRouter.route('/api/login')
    .all((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    next();
    /*
    var form = new multiparty.Form();
    //var image;
    var user;
    var pwd;
    var file;
    form.on('error', next );
    form.on('close', next );
    
    // listen on field event for title
    form.on('field', function(name, val){
      req.form = {} ;
      req.form[name] = val ;
    });
    
    // listen on part event for image file
    form.on('part', function(part){
      if (!part.filename) return;
      if (part.name !== 'image') return part.resume();
      file = {};
      file.filename = part.filename;
      file.size = 0;
      
      part.on('data', function(buf){
        file.size += buf.length;
      });
    });
    
    
    // parse the form
    form.parse(req);
    })
    */
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    console.log('**************************');
    if (!user.length)
        throw new Error('no valid values');
    let isEmail = String(user).includes('@');
    const data = yield Controllers.getAccountByNameOrMail(user, isEmail);
    if (data) {
        const userObj = new user_class_1.default(data.id, data.name, data.createdBy, data.status, data.createdDate, data.modifiedDate);
        res.cookie('user', JSON.stringify(userObj));
        return res.send(userObj);
    }
    else {
        return res.status(400).end();
    }
})); /*
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateAccount (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  
  const {id} = req.params;
  const data = await Controllers.deleteAccount (Number (id));
  return res.send (data);
});*/
exports.default = userRouter;
