
import { SERV_Error } from "./error.class";

export interface Session {
    userid : number;
    ip: string;
    sessionid: string;
    startDateTime: Date | number;
    endDateTime?:  Date | number | null;
    keepLoggedIn: boolean;
}
  
  export class UserSession implements Session {
    readonly userid : number;
    readonly ip: string;
    readonly sessionid: string;
    readonly startDateTime: Date | number;
    readonly keepLoggedIn: boolean;
    endDateTime?:  Date | number | null;
  
    constructor (userid: number, ip:string, keepLoggedIn: boolean = false ) {
      this.userid = userid;
      this.ip = ip;
      this.startDateTime = Date.now ();
      this.sessionid = Buffer.from (JSON.stringify(this), 'utf8').toString ('hex');
      this.endDateTime = null;
      this.keepLoggedIn = keepLoggedIn;
    }
    getUserSessionId ()
    {
        return `${this.userid}::${this.sessionid}` as `${string}::${string}`
    }
    
    isValid () {
        return this.endDateTime ? false : true;
    }
    
    endUserSession () 
    {
        this.endDateTime = Date.now ();
        return this;
    }

  }

export type UserSessionIdKey = `${string}::${string}`;

export class SessionList extends Map <UserSessionIdKey, UserSession> 
        {   
            [userSessionId: UserSessionIdKey] : UserSession ;
            
            constructor () 
            {
                super ();
            }
               
  
        isValid (id: UserSessionIdKey) 
        {
            const exist = this.has (id) ? this.get(id) : false ;
            return  (!exist || exist.isValid ()) ; 
        }

        addSession (sessionObj: UserSession) 
        { 
            if (sessionObj.isValid () && this.isValid (sessionObj.getUserSessionId ()))
            { 
                this.set (sessionObj.getUserSessionId (), sessionObj);
                return  true;
            }   
            else 
            {
                let valid = sessionObj.endDateTime ? false : true;
                let exist = this.has (sessionObj.getUserSessionId ()) ? this.get (sessionObj.getUserSessionId ()) : false;
                if ((exist as UserSession).endDateTime || !valid) 
                {
                    throw new SERV_Error.SessionError (`Invalid User Session identifier: this session has already finished`);
                }                    
            
                return false;
            }
        }            
      
        deleteSession (userSessionId: UserSessionIdKey) { 
        
            return this.delete (userSessionId);
        }

        endSession (userSessionId: UserSessionIdKey)
        {
            if (this.has (userSessionId))
            {
                const userSession = this.get (userSessionId) as UserSession;
                userSession?.endUserSession ();
                this.set (userSession?.getUserSessionId (), userSession.endUserSession ());
                return userSession;      
            }
            return ;
        }
                
        removeEndedSessions (offset: number = 3600) 
        {
            let counter = 0;
            this.forEach ((session: UserSession, key: UserSessionIdKey) => {
                const now = Date.now ();
                if (session.endDateTime 
                    && (new Date (session.endDateTime).valueOf() + (offset * 1000) < now) //offset is used to set the session validity length
                )
                {
                    this.delete (key);
                    counter += 1;
                    return true;
                }
                return false;
            });
            return counter;
        }
    }    


    class Sessions {

        static sessionsList = new SessionList ();
        static count = this.sessionsList.size ;
        static countActive = this.count ? this.getActive () : 0; 
        static addSession (sessionData: UserSession) {
            return this.sessionsList.addSession (sessionData);
        }
        static getActive () {
            let count = 0;
            this.sessionsList.forEach (session => session.isValid () ? ++count  : count);
            return count;
        }
        static endSession (key: UserSessionIdKey) {
            return this.sessionsList.endSession (key);
        }
        
    
    }
  
  export default Sessions;
  

  