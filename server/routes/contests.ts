import express, { NextFunction, Request, Response, Router } from 'express';
import db from '../utils'

const contestRouter: Router = express.Router()

contestRouter.route ('/api/contests')
.get (async (req: Request, res: Response, next: NextFunction) => {
  const data = await db.getAccount ();
  return res.send (data);
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const data = await db.getAccount ();
  return res.send (data);
})


contestRouter.route ('/api/contests/:id')
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



export default contestRouter;