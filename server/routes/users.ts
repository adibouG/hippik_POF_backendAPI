import express, { NextFunction, Request, Response, Router } from 'express';
import * as Controllers from '../controllers' ;
import {User, UserWithCred} from '../models/user.class';
import {genrateSaltHashPassword, comparePwd} from '../utils/utils';
const userRouter: Router = express.Router()

userRouter.route ('/api/users')
.get (async (req: Request, res: Response) => {
  const data = await Controllers.getAccounts ()
  return res.send (data);
})
.post (async (req: Request, res: Response) => {
  const data = await Controllers.createAccount (req.body);
  return res.send (data);
});


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
      res.cookie ('user', JSON.stringify (userObj));
      return res.send (userObj);
    }
    else throw new Error ('invalid user/pwd') ;
  }
  catch (e)
  {
    return res.status (400).send (e);
  }
})

userRouter.route ('/api/user/register')
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
      const userPwd = genrateSaltHashPassword (pwd); 
      const userObj = new UserWithCred (data, userPwd.passwordHash, userPwd.salt);
      const saveUser = await Controllers.createAccount (userObj);
      if (saveUser) {
     //     const data = await Controllers.getAccountByNameOrMail (userObj.name, false);
      }
      res.cookie ('user', JSON.stringify (saveUser));
        return res.send (saveUser);
      
    }
    else throw new Error ('invalid user/pwd') ;
  }
  catch (e)
  {
    return res.status (400).send (e);
  }
})
export default userRouter;