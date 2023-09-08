"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionList = exports.UserSession = exports.SessionError = void 0;
class SessionError extends Error {
    constructor(...args) {
        super(...args);
        this.name = 'UserSessionError';
    }
}
exports.SessionError = SessionError;
class UserSession {
    constructor(userid, ip, keepLoggedIn = false) {
        this.userid = userid;
        this.ip = ip;
        this.startDateTime = Date.now();
        this.sessionid = Buffer.from(JSON.stringify(this), 'utf8').toString('hex');
        this.endDateTime = null;
        this.keepLoggedIn = keepLoggedIn;
    }
    getUserSessionId() {
        return `${this.userid}::${this.sessionid}`;
    }
    isValid() {
        return this.endDateTime ? false : true;
    }
    endUserSession() {
        this.endDateTime = Date.now();
        return this;
    }
}
exports.UserSession = UserSession;
class SessionList extends Map {
    constructor() {
        super();
    }
    isValid(id) {
        const exist = this.has(id) ? this.get(id) : false;
        return (!exist || exist.isValid());
    }
    addSession(sessionObj) {
        if (sessionObj.isValid() && this.isValid(sessionObj.getUserSessionId())) {
            this.set(sessionObj.getUserSessionId(), sessionObj);
            return true;
        }
        else {
            let valid = sessionObj.endDateTime ? false : true;
            let exist = this.has(sessionObj.getUserSessionId()) ? this.get(sessionObj.getUserSessionId()) : false;
            if (exist.endDateTime || !valid) {
                throw new SessionError(`Invalid User Session identifier: this session has already finished`);
            }
            return false;
        }
    }
    deleteSession(userSessionId) {
        return this.delete(userSessionId);
    }
    endSession(userSessionId) {
        if (this.has(userSessionId)) {
            const userSession = this.get(userSessionId);
            userSession === null || userSession === void 0 ? void 0 : userSession.endUserSession();
            this.set(userSession === null || userSession === void 0 ? void 0 : userSession.getUserSessionId(), userSession.endUserSession());
            return userSession;
        }
        return;
    }
    removeEndedSessions(offset = 3600) {
        let counter = 0;
        this.forEach((session, key) => {
            const now = Date.now();
            if (session.endDateTime
                && (new Date(session.endDateTime).valueOf() + (offset * 1000) < now) //offset is used to set the session validity length
            ) {
                this.delete(key);
                counter += 1;
                return true;
            }
            return false;
        });
        return counter;
    }
}
exports.SessionList = SessionList;
class Sessions {
    static addSession(sessionData) {
        return this.sessionsList.addSession(sessionData);
    }
    static getActive() {
        let count = 0;
        this.sessionsList.forEach(session => session.isValid() ? ++count : count);
        return count;
    }
    static endSession(key) {
        return this.sessionsList.endSession(key);
    }
}
_a = Sessions;
Sessions.sessionsList = new SessionList();
Sessions.count = _a.sessionsList.size;
Sessions.countActive = _a.count ? _a.getActive() : 0;
exports.default = Sessions;
//# sourceMappingURL=sessions.class.js.map