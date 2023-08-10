import express, { NextFunction, Request, Response, Router } from 'express';
import * as Controllers from '../controllers' ;

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

export default userRouter;