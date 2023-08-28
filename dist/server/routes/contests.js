"use strict";
/*
* Contest, trials, participants,....
*
* A contest is representing an event, it should be made of 1 or more trials.
* The participants are challenging during the trials.
* Each contest's participants register also to trial in order to be able to record their performance during the said trial.
* At the completion of the trial by all the registered participants, a sorting, with resume and stats are pulled off the completed trial.
* The trial has a global result, and each participant has its own trial results.
* These will be taken in account for the calculation of the contest end-results.
*/
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
const multer_1 = __importDefault(require("multer"));
const Controllers = __importStar(require("../controllers"));
const contest_class_1 = require("../models/contest.class");
const upload = (0, multer_1.default)({ dest: '../../files/' });
const contestRouter = express_1.default.Router();
/*
* Contest Routes
*
* A contest is representing an event, it should be made of 1 or more trials.
* The participants are challenging during the trials.
* Each contest's participants register also to trial in order to be able to record their performance during the said trial.
*/
const authHeaderCheck = (req, res, next) => {
    const headr = req.get('authorization');
    if (headr) {
        const b64cred = headr.split(' ').at(1);
        const auth = btoa(b64cred);
        const [userId, sessionId] = auth.split(':');
        //checkSession ()
        res.locals = { userId, sessionId };
        next();
    }
    else {
        const err = new Error('invalid user session');
        throw err;
    }
};
contestRouter.route('/api/contests')
    .all(authHeaderCheck)
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.getContests();
    return res.send(data);
}))
    .post(upload.array('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, startdate, enddate, desc } = req.body;
    const { userId } = res.locals;
    let check;
    if (!(name && startdate && location))
        throw new Error('missing required contest data');
    const images = [];
    if (Array.isArray(req.files) && req.files.length)
        req.files.forEach(el => {
            if (el.path.endsWith('/') || el.path.endsWith('\\'))
                images.push(el.path + el.filename);
            else
                images.push(el.path + '/' + el.filename);
        });
    const contestData = new contest_class_1.Contest({ name, userId, location,
        startDate: new Date(startdate), endDate: new Date(enddate),
        desc, images });
    check = yield Controllers.checkContest(contestData);
    if (check && check.length) {
        const messageDesc = 'A contest with the same name, start date and location exist';
        return res.status(200).send({ message: messageDesc, dataSubmitted: req.body, dataRetrieved: check });
    }
    else {
        yield Controllers.createContest(contestData);
        return res.send(contestData);
    }
}));
contestRouter.route('/api/contests/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.getContest(Number(id));
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.updateContest(req.body);
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.deleteContest(Number(id));
    return res.send(data);
}));
/*
* Contest's trials
*/
contestRouter.route('/api/contests/:contestId/trials')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.getTrials();
    return res.send(data);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.createTrial(req.body);
    return res.send(data);
}));
contestRouter.route('/api/contests/:contestId/trials/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.getTrial(Number(id));
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.updateTrial(req.body);
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.deleteTrial(Number(id));
    return res.send(data);
}));
/*
* Contest's participant
*/
contestRouter.route('/api/contests/:contestId/participants')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.getParticipants();
    return res.send(data);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.createParticipant(req.body);
    return res.send(data);
}));
contestRouter.route('/api/contests/:contestId/participants/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, contestId } = req.params;
    const data = yield Controllers.getParticipant(Number(id));
    res.cookie('user', JSON.stringify(data));
    return res.send(`user: ${id} - ${JSON.stringify(data)}`);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Controllers.updateParticipant(req.body);
    return res.send(data);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Controllers.deleteParticipant(Number(id));
    return res.send(data);
}));
exports.default = contestRouter;
//# sourceMappingURL=contests.js.map