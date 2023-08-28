"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithCred = exports.User = void 0;
class User {
    constructor({ id, email, role, name = "", createdBy, status, created, modified, pwd = null, salt = null }) {
        this.id = id;
        this.email = email;
        this.name = name.length ? name : email;
        this.role = role;
        this.status = status;
        this.created = created ? new Date(created) : new Date();
        this.modified = modified ? new Date(modified) : new Date();
        this.createdBy = createdBy;
        if (pwd)
            this.pwd = pwd;
        if (salt)
            this.salt = salt;
    }
}
exports.User = User;
class UserWithCred extends User {
    constructor(data, pwd, salt) {
        super(data);
        this.pwd = pwd;
        this.salt = salt;
    }
}
exports.UserWithCred = UserWithCred;
//# sourceMappingURL=user.class.js.map