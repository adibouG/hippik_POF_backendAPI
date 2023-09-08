/*****************************************************************************************
 *  FIle : Utils.ts
 *  Desc : Contains utility and Helper functions and classes that  
 *         Usage is not related to a specific module or component,
 *         and neither to the Data Model.
 *                
 *****************************************************************************************/

import {randomBytes, createHmac} from 'node:crypto';

type HashedPwd = { 
  salt: string;
  passwordHash: string
}

// randomSalt : generate a random hex string of length <size>  
const randomSalt = (size: number = 16) => randomBytes (Math.ceil (size/2)).toString ('hex').slice (0, size);

// hasher : hash pwd string using salt and according the algo selected   
const hasher = (pwd: string, salt:string, algo: string = 'sha512'): HashedPwd => {
    const hash = createHmac (algo, salt);    
    hash.update (pwd);
    const passwordHash = hash.digest ('hex');
    return { salt, passwordHash };
};

/*
*  genrateSaltHashPassword : Hash and Salt a string received from a user input (e.g. password)  
*  - [in] userPwd: the string provided by the user as input for its pwd 
*  - [in -optional] saltLength: the length of the random salt to generate, used in the pwd hashing process  
*  - [out] { salt: string, passwordHash: string }: an object with salt and hashed password to store or use
*/
export function genrateSaltHashPassword (userPwd: string, saltLength?: number) : HashedPwd{
    const salt = randomSalt (saltLength);
    const normalizedPwd = userPwd.normalize ('NFC');
    return hasher (normalizedPwd, salt);
  }

/*
*  comparePwd Hash and Salt a string received from a user input (e.g. password)  
*  - [in] userPwd: the string provided by the user as input to be compared to 
*  - [in] hsalt: the hashed salt used in the pwd hashing process  
*  - [in] hpwd: the hashed pwd to compare to  
*  - [out]: a boolean, true if compare successfully or false if not
*/
export function comparePwd (userPwd: string, hsalt: string, hpwd: string): boolean {
  const normalizedPwd = userPwd.normalize ('NFC');    
  const hresult = hasher (normalizedPwd, hsalt);
  return (hresult.passwordHash === hpwd); 
  }