"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
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
exports.default = User;
