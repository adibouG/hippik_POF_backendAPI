"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithCred = exports.User = void 0;
class User {
    constructor({ id, email, role, name, createdBy, status, created, modified }) {
        this.id = id;
        this.name = name || email;
        this.email = email;
        this.role = role;
        this.status = status;
        this.created = created ? new Date(created) : new Date();
        this.modified = modified ? new Date(modified) : new Date();
        this.createdBy = createdBy;
    }
}
exports.User = User;
class UserWithCred extends User {
    constructor(data, pwd, salt) {
        super(data);
        this.pwd = pwd || null;
        this.salt = salt || null;
    }
}
exports.UserWithCred = UserWithCred;
//# sourceMappingURL=user.class.js.map