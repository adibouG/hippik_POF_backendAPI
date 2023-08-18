import express, { NextFunction, Request, Response, Router } from 'express';


import * as Controllers from '../controllers' ;
import User from '../models/user.class';

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

console.log (req);
next();
/*
var form = new multiparty.Form();
//var image;
var user;
var pwd;
var file;
form.on('error', next );
form.on('close', next );

// listen on field event for title
form.on('field', function(name, val){
  req.form = {} ;
  req.form[name] = val ;
});

// listen on part event for image file
form.on('part', function(part){
  if (!part.filename) return;
  if (part.name !== 'image') return part.resume();
  file = {};
  file.filename = part.filename;
  file.size = 0;
  
  part.on('data', function(buf){
    file.size += buf.length;
  });
});


// parse the form
form.parse(req);
})
*/
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const {user, pwd} = req.body ;
  console.log ('**************************') ;
  if (!user.length) throw new Error ('no valid values') ; 
  let isEmail: boolean = String (user).includes ('@');  
  const data = await Controllers.getAccountByNameOrMail (user, isEmail);
  if (data) {
    const userObj = new User (data.id, data.name, data.createdBy, data.status, data.createdDate, data.modifiedDate );
    res.cookie ('user', JSON.stringify (userObj));
    return res.send (userObj);
  }
  else
  {
    return res.status (400).end ();
  }
})/*
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateAccount (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  
  const {id} = req.params; 
  const data = await Controllers.deleteAccount (Number (id));
  return res.send (data);
});*/

export default userRouter;