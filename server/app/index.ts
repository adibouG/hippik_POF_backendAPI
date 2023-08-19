import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path' ;


const app: Express = express ();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use('/api/staticfiles',  express.static(path.join(__dirname, 'public'), ))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
export default app;