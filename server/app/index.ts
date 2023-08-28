import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path' ;

const app: Express = express ();


app.use(express.json ()); // for parsing application/json
app.use(express.urlencoded ({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/files',  express.static(path.join(__dirname, 'files')))
app.set ('userSessions' , {});

app.use((err: Error, req: Request, res: Response) => {
  console.error (err.name);
  console.error(err.message);
  console.error(err.stack);
  return res.status(500).send('Something broke!')
});


export default app;