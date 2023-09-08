import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path' ;
import Sessions , {UserSession, UserSessionIdKey} from '../models/sessions.class'

const app: Express = express ();


app.use(express.json ()); // for parsing application/json
app.use(express.urlencoded ({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/files',  express.static(path.join(__dirname, 'files')))




app.set ('authCheckMiddleware', (req: Request, res: Response, next: NextFunction) => {
  
  const headr = req.get('authorization');
     
  if (headr) { 
    const b64cred = headr.split (' ').at (1) as string ;
    const auth =  decodeURIComponent(Buffer.from (b64cred, 'base64').toString ()).split(':');
    const userId = (auth.at (0)) || '' ;
    const sessionId = auth.at (1) || '';

    const sessionKey: UserSessionIdKey = `${userId}::${sessionId}`; 
    //checkSession 
    if (Sessions.sessionsList.isValid (sessionKey))
    {
      res.locals = { userId, sessionId };
      return next () ;
    }
  }
  const err = new Error ('invalid user session') ;
  throw err;
});

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error (err.name);
  console.error(err.message);
  console.error(err.stack);
  if (err.message && err.message.includes('session')) res.set ('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"'); 
  return res.status(500).send('Something broke!')
}
export default app;