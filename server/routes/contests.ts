/*
* Contest, trials, participants,.... 
*
* A contest is representing an event, it should be made of 1 or more trials.
* The participants are challenging during the trials.
* Each contest's participants register also to trial in order to be able to record their performance during the said trial.  
* At the completion of the trial by all the registered participants, a sorting, with resume and stats are pulled off the completed trial.
* The trial has a global result, and each participant has its own trial results. 
* These will be taken in account for the calculation of the contest end-results. 
*/

import express, { NextFunction, Request, Response, Router, application, request } from 'express';
import app from '../app';
import fs from 'fs';
import multer from 'multer';
import * as Controllers from '../controllers';
import { Contest } from '../models/contest.class';
import Err from '../models/error.class';
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    let fieldname = file.fieldname;
    let pageName = req.path;
    const unique = pageName + '_' + fieldname + '_'+  Date.now()   + '_' + name ;
    cb(null, unique);
  }
})
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 /*1MB*/ },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/*'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Err({message: 'Invalid file type'});
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }})

const contestRouter: Router = express.Router()


/*
* Contest Routes
* 
* A contest is representing an event, it should be made of 1 or more trials.
* The participants are challenging during the trials.
* Each contest's participants register also to trial in order to be able to record their performance during the said trial.  
*/


contestRouter.route ('/api/contests')
//.all (app.get ('authCheckMiddleware')) 
.get (async (req: Request, res: Response, next: NextFunction) => {
  const data = await Controllers.getContests ();
  return res.send (data);
})
.post (upload.array ('file'), async (req: Request, res: Response, next: NextFunction) => {
  const { name, location, startdate, enddate, desc } = req.body;
  const { userId, sessionId } = res.locals;
  let check;
  if (!(name && location)) throw new Error ('missing required contest data')
  const images: string[] = [];
  if (req.files && Array.isArray(req.files) &&  req.files.length) req.files.forEach (el => { 
   images.push (el.path) ;
  });


  const contestData = new Contest ({ name, userId: 2, location,
                                      startDate: new Date(startdate), endDate: new Date(enddate),
                                      desc, images });
  check = await Controllers.checkContest (contestData);
  if (check && check.length) 
  {
    const messageDesc = 'A contest with the same name, start date and location exist';  
    return res.status (200).send ({ message: messageDesc, dataSubmitted: req.body, dataRetrieved: check });
  } 
  else
  {
    
    await Controllers.createContest (contestData);
    return res.send (contestData);
  }
})

contestRouter.route ('/api/contests/:id')
.get (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await Controllers.getContest (Number (id));
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateContest (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {

  const {id} = req.params; 
  const data = await Controllers.deleteContest (Number (id));
  return res.send (data);
});

/*
* Contest's trials
*/
contestRouter.route ('/api/contests/:contestId/trials')
.get (async (req: Request, res: Response, next: NextFunction) => {
  const data = await Controllers.getTrials ();
  return res.send (data);
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const data = await Controllers.createTrial (req.body);
  return res.send (data);
})


contestRouter.route ('/api/contests/:contestId/trials/:id')
.get (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await Controllers.getTrial (Number (id));
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateTrial (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await Controllers.deleteTrial (Number (id));
  return res.send (data);
});

/*
* Contest's participant
*/
contestRouter.route ('/api/contests/:contestId/participants')
.get (async (req: Request, res: Response, next: NextFunction) => {
  const data = await Controllers.getParticipants ();
  return res.send (data);
})
.post (async (req: Request, res: Response, next: NextFunction) => {
  const data = await Controllers.createParticipant (req.body);
  return res.send (data);
})


contestRouter.route ('/api/contests/:contestId/participants/:id')
.get (async (req: Request, res: Response) => {
  const {id, contestId} = req.params; 
  const data = await Controllers.getParticipant (Number (id));
  res.cookie ('user', JSON.stringify (data));
  return res.send (`user: ${id} - ${JSON.stringify (data)}`);
})
.put (async (req: Request, res: Response) => {
  const data = await Controllers.updateParticipant (req.body);
  return res.send (data);
})
.delete (async (req: Request, res: Response) => {
  const {id} = req.params; 
  const data = await Controllers.deleteParticipant (Number (id));
  return res.send (data);
});




export default contestRouter;