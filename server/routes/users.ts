import express, { NextFunction, Request, Response, Router } from 'express';
import app from '../app';
import * as Controllers from '../controllers' ;
import {User, UserWithCred} from '../models/user.class';
import Sessions , {UserSession, UserSessionIdKey} from '../models/sessions.class'
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
.all (app.get ('authCheckMiddleware')) 
.get (async (req: Request, res: Response) => {
  const data: User[] = await Controllers.getAccounts ();
  console.log (data)
  data.map((el: User, id: number, mod) => checkAndRemovePwdData (el));
  console.log (data)
  return res.send (data);
})


userRouter.route ('/api/users/:id')
.all (app.get ('authCheckMiddleware')) 
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



userRouter.route ('/api/logout')
.all (app.get ('authCheckMiddleware')) 
.post (async (req: Request, res: Response, next: NextFunction) => {
  
  try
  { 
    const userdata = req.body ;
    let { userId, sessionId }  = res.locals;

    const id = userdata.id;
    let userSessionId : UserSessionIdKey = `${userId}::${sessionId}`;
 //   if (userId !=  id)   console.log (`userId ${userId} !=  id ${id}`)
    if (Sessions.sessionsList.has (userSessionId)) Sessions.endSession (userSessionId)
    
    res.set ('Clear-Site-userSessions', '"cache", "cookies", "storage", "executionContexts"');

 
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
    
      if (Sessions.sessionsList.addSession(sessionData))
      {      
        res.cookie ('user', JSON.stringify(userObj));
        res.cookie ('sessionid', sessionData.sessionid);
        return res.send (userObj);
      }
      else 
      {

      }
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