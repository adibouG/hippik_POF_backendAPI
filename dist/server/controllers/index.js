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
exports.deleteParticipant = exports.updateParticipant = exports.createParticipant = exports.checkParticipant = exports.getAllParticipants = exports.getParticipants = exports.getParticipant = exports.deleteTrial = exports.updateTrial = exports.checkTrial = exports.createTrial = exports.getAllTrials = exports.getTrials = exports.getTrial = exports.deleteContest = exports.updateContest = exports.createContest = exports.checkContest = exports.getContests = exports.getContest = exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.getAccounts = exports.getAccount = exports.getAccountByNameOrMail = void 0;
const db_control_1 = __importDefault(require("../../db/db_control"));
const contest_class_1 = require("../models/contest.class");
//Users
function getAccountByNameOrMail(user, isEmail = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.length)
                return false;
            let result;
            if (isEmail)
                result = yield db_control_1.default.get `SELECT * FROM accounts WHERE email = ${user}`;
            else
                result = yield db_control_1.default.get `SELECT * FROM accounts WHERE name = ${user}`;
            console.log(result);
            return result;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getAccountByNameOrMail = getAccountByNameOrMail;
;
function getAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        const result = yield db_control_1.default.get `SELECT * FROM accounts WHERE id = ${id}`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getAccount = getAccount;
;
function getAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM accounts`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getAccounts = getAccounts;
;
function deleteAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        yield db_control_1.default.run `UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now().toString()} \
        WHERE id = ${id}`;
    });
}
exports.deleteAccount = deleteAccount;
;
function updateAccount(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, created, modified, status } = data;
            yield db_control_1.default.run `UPDATE contests \
            SET name=${name}, location=${location}, created=${created}, modified=${modified}, status=${status} \
                WHERE id=${id}`;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateAccount = updateAccount;
function createAccount(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, pwd, salt, created, modified, status } = data;
            {
                const createdStamp = created === null || created === void 0 ? void 0 : created.valueOf();
                const modStamp = modified === null || modified === void 0 ? void 0 : modified.valueOf();
                const row = yield db_control_1.default.get(`SELECT statusId FROM account_status WHERE status = ${status}`);
                yield db_control_1.default.run(`INSERT INTO accounts (name, email, status, created, modified) \
                            VALUES (${name}, ${email}, ${row.statusId}, ${created}, ${modified}})`); /*,
                {$name: name, $email: email, $created:createdStamp, $modified:modStamp, $status: row.statusId},
          //db.db.serialize(function(){
    //db.run(`BEGIN TRANSACTION`)
await   db.run("INSERT INTO accounts (name, email, status, created, modified) \
                VALUES ($name, $email, $created, $modified, $status)",
                {$name: name, $email: email, $created:createdStamp, $modified:modStamp, $status: row.statusId},
                function(err){
                 if (err) {
                     db.run("ROLLBACK TRANSACTION");
                     throw err;
                 }
                 db.run("COMMIT TRANSACTION");
                 return this.lastID;
                })  ;
                */
                return yield getAccountByNameOrMail(data.email, false);
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createAccount = createAccount;
//AccountStatus
function getAccountStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!status)
            return yield db_control_1.default.all `SELECT * FROM account_status`;
        if (String(status).length && typeof status === 'string')
            return yield db_control_1.default.get `SELECT * FROM account_status WHERE status = ${status}`;
        return yield db_control_1.default.get `SELECT * FROM account_status WHERE statusId = ${status}`;
    });
}
;
//Contests
function getContests() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM contests`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getContests = getContests;
function getContest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        const result = yield db_control_1.default.get `SELECT * FROM contests WHERE id = ${id}`;
        console.log(JSON.stringify(result));
        const obj = new contest_class_1.Contest(result);
        return obj;
    });
}
exports.getContest = getContest;
function deleteContest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        yield db_control_1.default.run `UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now().toString()} \
        WHERE id = ${id}`;
    });
}
exports.deleteContest = deleteContest;
;
function checkContest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, startDate, location } = data;
        if (name === null || name === void 0 ? void 0 : name.length) {
            const result = yield db_control_1.default.all `SELECT * FROM contests WHERE  name= ${name}`;
            console.log(JSON.stringify(result));
            if (result.length) {
                const check = (d) => {
                    let isSameLoc = false;
                    let isSameStartDate = false;
                    if (d.location === location) {
                        isSameLoc = true;
                    }
                    if (d.startDate === startDate) {
                        isSameStartDate = true;
                    }
                    return isSameLoc && isSameStartDate;
                };
                const obj = result.filter(check);
                return obj;
            }
        }
    });
}
exports.checkContest = checkContest;
function updateContest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, location, startDate, endDate, createdDate, modifiedDate, status } = data;
            yield db_control_1.default.run `UPDATE contests \
            SET name=${name}, location=${location}, startdate=${startDate}, enddate=${endDate}, created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateContest = updateContest;
function createContest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, location, startDate, endDate, createdDate, modifiedDate, status } = data;
            if (!id || isNaN(id) || id < 1) {
                id = 0;
                yield db_control_1.default.run `INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createContest = createContest;
//Trial
function getTrials() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM contests`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getTrials = getTrials;
function getAllTrials() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM contests`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getAllTrials = getAllTrials;
function getTrial(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        const result = yield db_control_1.default.get `SELECT * FROM contests WHERE id = ${id}`;
        console.log(JSON.stringify(result));
        const obj = new contest_class_1.Contest(result);
        return obj;
    });
}
exports.getTrial = getTrial;
function deleteTrial(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        yield db_control_1.default.run `UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now().toString()} \
        WHERE id = ${id}`;
    });
}
exports.deleteTrial = deleteTrial;
;
function checkTrial(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, startDate, location } = data;
        if (name === null || name === void 0 ? void 0 : name.length) {
            const result = yield db_control_1.default.all `SELECT * FROM contests WHERE  name= ${name}`;
            console.log(JSON.stringify(result));
            if (result.length) {
                const check = (d) => {
                    let isSameLoc = false;
                    let isSameStartDate = false;
                    if (d.location === location) {
                        isSameLoc = true;
                    }
                    if (d.startDate === startDate) {
                        isSameStartDate = true;
                    }
                    return isSameLoc && isSameStartDate;
                };
                const obj = result.filter(check);
                return obj;
            }
        }
    });
}
exports.checkTrial = checkTrial;
function updateTrial(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, location, startDate, endDate, createdDate, modifiedDate, status } = data;
            yield db_control_1.default.run `UPDATE contests \
            SET name=${name}, location=${location}, startdate=${startDate}, enddate=${endDate}, created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateTrial = updateTrial;
function createTrial(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, location, startDate, endDate, createdDate, modifiedDate, status } = data;
            if (!id || isNaN(id) || id < 1) {
                id = 0;
                yield db_control_1.default.run `INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createTrial = createTrial;
//Participant
function getParticipants() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM contests`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getParticipants = getParticipants;
function getAllParticipants() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_control_1.default.all `SELECT * FROM contests`;
        console.log(JSON.stringify(result));
        return result;
    });
}
exports.getAllParticipants = getAllParticipants;
function getParticipant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        const result = yield db_control_1.default.get `SELECT * FROM contests WHERE id = ${id}`;
        console.log(JSON.stringify(result));
        const obj = new contest_class_1.Contest(result);
        return obj;
    });
}
exports.getParticipant = getParticipant;
function deleteParticipant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || isNaN(id) || id < 1)
            id = 1;
        yield db_control_1.default.run `UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now().toString()} \
        WHERE id = ${id}`;
    });
}
exports.deleteParticipant = deleteParticipant;
;
function checkParticipant(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, startDate, location } = data;
        if (name === null || name === void 0 ? void 0 : name.length) {
            const result = yield db_control_1.default.all `SELECT * FROM contests WHERE  name= ${name}`;
            console.log(JSON.stringify(result));
            if (result.length) {
                const check = (d) => {
                    let isSameLoc = false;
                    let isSameStartDate = false;
                    if (d.location === location) {
                        isSameLoc = true;
                    }
                    if (d.startDate === startDate) {
                        isSameStartDate = true;
                    }
                    return isSameLoc && isSameStartDate;
                };
                const obj = result.filter(check);
                return obj;
            }
        }
    });
}
exports.checkParticipant = checkParticipant;
function updateParticipant(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, createdDate, modifiedDate, status } = data;
            yield db_control_1.default.run `UPDATE contests \
            SET name=${name},created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateParticipant = updateParticipant;
function createParticipant(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id, name, location, startDate, endDate, createdDate, modifiedDate, status } = data;
            if (!id || isNaN(id) || id < 1) {
                id = 0;
                yield db_control_1.default.run `INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createParticipant = createParticipant;
//# sourceMappingURL=index.js.map