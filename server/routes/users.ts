import express, { NextFunction, Request, Response, Router } from 'express';
import db from '../utils'

const userRouter: Router = express.Router()

userRouter.route ('/api/users')
.get (async (req: Request, res: Response) => {
  const data = await db.getAccount ();
  return res.send (data);
})
.post (async (req: Request, res: Response) => {
  const data = await db.getAccount ();
  return res.send (data);
});


userRouter.route ('/api/users/:id')
.all (async (req: Request, res: Response, next: NextFunction) => {
//check token 
//log request
if (1) next ();

})
.get (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await db.getAccount ();
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await db.getAccount ();
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  const data = await db.getAccount ();
  return res.send (data);
});

export default userRouter;