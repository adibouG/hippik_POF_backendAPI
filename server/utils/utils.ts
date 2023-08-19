
import { randomBytes, createHmac, Hmac } from 'node:crypto';




const rSalt = () => randomBytes(Math.ceil (16/2)).toString('hex').slice (0, 16);


const sha512 = (password: string, salt:string) => {
    const normalizedPwd = password.normalize ('NFC');
   // const normalizedSalt = salt.normalize ('NFC');
    const hash = createHmac('sha512', salt);    
    hash.update(normalizedPwd);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
};
  
export function genrateSaltHashPassword(userpassword: string) {
    const salt = rSalt ();
    const normalizedPwd = userpassword.normalize ('NFC');
    const passwordData = sha512(normalizedPwd, salt);
    console.log('UserPassword = '+userpassword);
    console.log('normalizedPwd = '+normalizedPwd);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\\nSalt = '+passwordData.salt);
    return passwordData;
  };

export  function comparePwd (pwd: string, hsalt: string, hpwd: string): boolean {
    const hresult = sha512 (pwd, hsalt);
    return (hresult.passwordHash === hpwd) ; 
  };
