import express, { NextFunction, Request, Response, Router } from 'express';
import * as Controllers from '../controllers' ;
import {User, UserWithCred} from '../models/user.class';
import {genrateSaltHashPassword, comparePwd} from '../utils/utils';
const userRouter: Router = express.Router()

const checkAndRemovePwdData = ( account: User/*, i:number, source: User[]*/ ) => {
  for (const k in account)
  {
    if (k === 'pwd' || k === 'salt') 
    {
      let ac = account as User; 
      delete account.pwd;
      delete account.salt;
      return account;
    }
  }
}

userRouter.route ('/api/users')
.get (async (req: Request, res: Response) => {
  const data: User[] = await Controllers.getAccounts ();
  console.log (data)
  data.map((el: User, id: number, mod) => checkAndRemovePwdData (el));
  console.log (data)
  return res.send (data);
})


userRouter.route ('/api/users/:id')
.all (async (req: Request, res: Response, next: NextFunction) => {
//check token 
//log request
if (1) next ();
else throw new Error ();
})
.get (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await Controllers.getAccount (Number (id));
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateAccount (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  
  const {id} = req.params; 
  const data = await Controllers.deleteAccount (Number (id));
  return res.send (data);
});

interface Session {
  userid : number,
  ip: string,
  sessionid: string,
  startDateTime: Date | number,
  endDateTime?:  Date | number | null
}

class UserSession implements Session {
  userid : number;
  ip: string;
  sessionid: string;
  startDateTime: Date | number;
  endDateTime?:  Date | number | null;

  constructor (userid: number, ip:string) {
    this.userid = userid;
    this.ip = ip;
    this.startDateTime = Date.now ();
    this.sessionid = userid + '.' + this.startDateTime ;
    this.endDateTime = null;
  }
    
}
interface SessionList {
  [id: number]: UserSession ;
}
const sessions: SessionList = {} ;

const addSession = (sessionObj: UserSession, sessionListObj: SessionList) => { 
  
  if (!sessionListObj[sessionObj.userid] || sessionListObj[sessionObj.userid].endDateTime) sessionListObj[sessionObj.userid] = sessionObj ;
  else throw new Error ('sessiom exist')

}
const deleteSession = (userid: number, sessionListObj: SessionList) => { 
  
  if (sessionListObj[userid] && !sessionListObj[userid].endDateTime) sessionListObj[userid].endDateTime = Date.now () ;
  else return false;

}

userRouter.route ('/api/logout')
.all (async (req: Request, res: Response, next: NextFunction) => {
  
//session check 
//user check
next();
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  
  try
  { 
    const userdata = req.body ;
    const head = req.get('authorization');
    let userId;
    let sessionId; 
    if (head) { 
      const cred = head.split (' ').at (1) as string ;
      const auth = btoa (cred);
      userId = auth.split(':').at (0);
      sessionId = auth.split(':').at (1);
    } 
    const id = userdata.id;
 //   if (userId !=  id)   console.log (`userId ${userId} !=  id ${id}`)
    if (!deleteSession (id, sessions)) deleteSession (Number (userId), sessions)
    
    res.set ('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');
    res.set ('Refresh', '0');
    res.redirect ('/');
    return res.end ();
  }
  catch (e)
  {
    res.set ('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');
    res.set ('Refresh', '1');
    return res.status (400).send (e);
  }
})
userRouter.route ('/api/login')
.all (async (req: Request, res: Response, next: NextFunction) => {
  
//  const t = genrateSaltHashPassword ('test');
//  console.log (t.passwordHash);
//  console.log (t.salt);
//console.log (genrateSaltHashPassword ('test').passwordHash);
next();
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const {user, pwd} = req.body ;
  try
  {
    if (!user.length) throw new Error ('no valid values') ; 
    const isEmail: boolean = String (user).includes ('@');  
    const data = await Controllers.getAccountByNameOrMail (user, isEmail);
    if (!data) throw new Error ('user not found') ;
    if (comparePwd (pwd, data.salt, data.pwd)) { 
      const userObj = new User (data);// .id, , , data.email, data.name, data.createdBy, data.status, createDate, modDate);
      checkAndRemovePwdData (userObj);
      const sessionData = new UserSession (userObj.id, req.ip);
      sessions[sessionData.userid] = sessionData;
      res.cookie ('user', userObj);
      res.cookie ('sessionid', btoa (sessionData.sessionid));
      return res.send (userObj);
    }
    else throw new Error ('invalid user/pwd') ;
  }
  catch (e)
  {
    return res.status (400).send (e);
  }
})

userRouter.route ('/api/users/register')
.all (async (req: Request, res: Response, next: NextFunction) => {

console.log (req);
next();
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const { user, email, pwd, isAdmin } = req.body ;
  try
  {
    if ((!user.length && !email.length) || !pwd.length) throw new Error ('missing mandatory values') ; 
    const isEmail: boolean = email && String (email).includes ('@');  
    let isOk = true; // flag to track if user values are good
    //email is 1st unique chek 
    if (isEmail) {
      const data = await Controllers.getAccountByNameOrMail (email, isEmail);
      if (data) {
        isOk = false;
        throw new Error ('email already exist') ;
      }
    }  
    // name is 2nd check
    let name = user && user.length ? user : email ;
    const data = await Controllers.getAccountByNameOrMail (name, false);
    if (data) {
      isOk = false;
      throw new Error ('name already exist') ;
    }
    
    if (isOk) {
      //go for the pwd   
      const userPwd = genrateSaltHashPassword (pwd);  //TODO : move in controller
      const userObj = new UserWithCred (data, userPwd.passwordHash, userPwd.salt);
      const saveUser = await Controllers.createAccount (userObj);
      if (saveUser) {
        const data = await Controllers.getAccountByNameOrMail (userObj.name, false);
        const newAccount = new User (data);
        return res.send (newAccount);
      }

      return res.status (500).send ('unknow issue while registering the account');
    }
    else throw new Error ('invalid user/pwd') ;
  }
  catch (e)
  {
    console.log (e);
    return res.status (400).send (e);
  }
})
export default userRouter;