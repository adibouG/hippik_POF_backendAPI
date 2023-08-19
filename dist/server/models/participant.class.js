"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horse = exports.Team = exports.Participant = void 0;
class Participant {
    constructor(id, name, createdBy, status, createdDate, modifiedDate) {
        if (id)
            this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now()).toString();
            this.status = status;
            this.createdDate = createdDate || new Date();
            this.modifiedDate = modifiedDate || new Date();
            this.createdBy = createdBy;
        }
    }
}
exports.Participant = Participant;
class Team {
    constructor(id, name, createdBy, status, createdDate, modifiedDate) {
        if (id)
            this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now()).toString();
            this.status = status;
            this.createdDate = createdDate || new Date();
            this.modifiedDate = modifiedDate || new Date();
            this.createdBy = createdBy;
        }
    }
}
exports.Team = Team;
class Horse {
    constructor(id, name, createdBy, status, createdDate, modifiedDate) {
        if (id)
            this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now()).toString();
            this.status = status;
            this.createdDate = createdDate || new Date();
            this.modifiedDate = modifiedDate || new Date();
            this.createdBy = createdBy;
        }
    }
}
exports.Horse = Horse;
//# sourceMappingURL=participant.class.js.map