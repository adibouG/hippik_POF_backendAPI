"use strict";
/*****************************************************************************************
 *  FIle : Utils.ts
 *  Desc : Contains utility and Helper functions and classes that
 *         Usage is not related to a specific module or component,
 *         and neither to the Data Model.
 *
 *****************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePwd = exports.genrateSaltHashPassword = void 0;
const node_crypto_1 = require("node:crypto");
// randomSalt : generate a random hex string of length <size>  
const randomSalt = (size = 16) => (0, node_crypto_1.randomBytes)(Math.ceil(size / 2)).toString('hex').slice(0, size);
// hasher : hash pwd string using salt and according the algo selected   
const hasher = (pwd, salt, algo = 'sha512') => {
    const hash = (0, node_crypto_1.createHmac)(algo, salt);
    hash.update(pwd);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
};
/*
*  genrateSaltHashPassword : Hash and Salt a string received from a user input (e.g. password)
*  - [in] userPwd: the string provided by the user as input for its pwd
*  - [in -optional] saltLength: the length of the random salt to generate, used in the pwd hashing process
*  - [out] { salt: string, passwordHash: string }: an object with salt and hashed password to store or use
*/
function genrateSaltHashPassword(userPwd, saltLength) {
    const salt = randomSalt(saltLength);
    const normalizedPwd = userPwd.normalize('NFC');
    return hasher(normalizedPwd, salt);
}
exports.genrateSaltHashPassword = genrateSaltHashPassword;
/*
*  comparePwd Hash and Salt a string received from a user input (e.g. password)
*  - [in] userPwd: the string provided by the user as input to be compared to
*  - [in] hsalt: the hashed salt used in the pwd hashing process
*  - [in] hpwd: the hashed pwd to compare to
*  - [out]: a boolean, true if compare successfully or false if not
*/
function comparePwd(userPwd, hsalt, hpwd) {
    const normalizedPwd = userPwd.normalize('NFC');
    const hresult = hasher(normalizedPwd, hsalt);
    return (hresult.passwordHash === hpwd);
}
exports.comparePwd = comparePwd;
//# sourceMappingURL=utils.js.map