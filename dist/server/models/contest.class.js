"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestTrial = exports.ContestList = exports.Contest = void 0;
class ImageFile {
    constructor(file, type, id, accountId) {
        this.file = file;
        this.type = type;
        this.id = id;
        this.account = accountId;
    }
}
class Contest {
    constructor({ id, name, userId, location, desc, startDate, endDate, status, images, createdDate, modifiedDate }) {
        this.id = id;
        this.name = name || (Date.now()).toString();
        this.desc = desc;
        this.location = location;
        this.startDate = startDate || new Date();
        this.endDate = endDate;
        this.status = status;
        this.createdDate = createdDate || new Date();
        this.modifiedDate = modifiedDate || new Date();
        this.userId = userId;
        if (images && images.length) {
            images.map((el => {
                if (typeof el === 'string') {
                    new ImageFile(el, 'contest', undefined, this.userId);
                }
            }));
        }
        this.images = images || [];
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
//# sourceMappingURL=contest.class.js.map