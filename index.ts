import express, { Express, NextFunction, Request, Response, Router } from 'express';
import dotenv from 'dotenv';

const Sqlitex: any = require ("sqlite-x");

const FILE_NAME: string = "./db/hippik_db.sql3";
const PORT_NUM: string = String (8000);
const env = <dotenv.DotenvPopulateInput>process.env;
const Setting = <dotenv.DotenvPopulateInput>{PORT: PORT_NUM, DB: FILE_NAME};
dotenv.populate (env, Setting);

const app: Express = express ();
const userRouter: Router = express.Router()
const contestRouter: Router = express.Router()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const db = new Sqlitex ("./db/hippik_db.sql3");

const getAccount = async () => { 
  const result = await db.get`SELECT * FROM accounts WHERE id = 1`;
  console.log (JSON.stringify(result));
  return result;
};

//getAccount();

userRouter.route ('/api/users')
.get (async (req: Request, res: Response) => {
  const data = await getAccount ();
  return res.send (data);
})
.post (async (req: Request, res: Response) => {
  const data = await getAccount ();
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
  const data = await getAccount ();
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await getAccount ();
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  const data = await getAccount ();
  return res.send (data);
});


contestRouter.route ('/api/contests')
.get (async (req: Request, res: Response, next: NextFunction) => {
  const data = await getAccount ();
  return res.send (data);
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const data = await getAccount ();
  return res.send (data);
})


contestRouter.route ('/api/contests/:id')
.get (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await getAccount ();
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await getAccount ();
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  const data = await getAccount ();
  return res.send (data);
});


app.use (contestRouter);
app.use (userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen (PORT_NUM, () => {
  console.log (`[server]: Server is running at http://localhost:${PORT_NUM}`);
});