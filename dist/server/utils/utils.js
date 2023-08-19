"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePwd = exports.genrateSaltHashPassword = void 0;
const node_crypto_1 = require("node:crypto");
const rSalt = () => (0, node_crypto_1.randomBytes)(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
const sha512 = (password, salt) => {
    const normalizedPwd = password.normalize('NFC');
    // const normalizedSalt = salt.normalize ('NFC');
    const hash = (0, node_crypto_1.createHmac)('sha512', salt);
    hash.update(normalizedPwd);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
};
function genrateSaltHashPassword(userpassword) {
    const salt = rSalt();
    const normalizedPwd = userpassword.normalize('NFC');
    const passwordData = sha512(normalizedPwd, salt);
    console.log('UserPassword = ' + userpassword);
    console.log('normalizedPwd = ' + normalizedPwd);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    console.log('\\nSalt = ' + passwordData.salt);
    return passwordData;
}
exports.genrateSaltHashPassword = genrateSaltHashPassword;
;
function comparePwd(pwd, hsalt, hpwd) {
    const hresult = sha512(pwd, hsalt);
    return (hresult.passwordHash === hpwd);
}
exports.comparePwd = comparePwd;
;
//# sourceMappingURL=utils.js.map