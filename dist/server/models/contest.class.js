"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestTrial = exports.ContestList = exports.Contest = void 0;
class Contest {
    constructor(id, name, createdBy, desc, location, startDate, endDate, status, createdDate, modifiedDate) {
        if (id)
            this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now()).toString();
            this.desc = desc;
            this.location = location;
            this.startDate = startDate || new Date();
            this.endDate = endDate;
            this.status = status;
            this.createdDate = createdDate || new Date();
            this.modifiedDate = modifiedDate || new Date();
            this.createdBy = createdBy;
        }
    }
}
exports.Contest = Contest;
class ContestList {
    constructor(list) {
        this.list = list;
    }
}
exports.ContestList = ContestList;
class ContestTrial {
    constructor(id, name, createdBy, desc, location, contest, startDate, endDate, status, createdDate, modifiedDate) {
        if (id)
            this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now()).toString();
            this.desc = desc;
            this.contest = contest;
            this.location = location;
            this.startDate = startDate || new Date();
            this.endDate = endDate;
            this.status = status;
            this.createdDate = createdDate || new Date();
            this.modifiedDate = modifiedDate || new Date();
            this.createdBy = createdBy;
        }
    }
}
exports.ContestTrial = ContestTrial;
