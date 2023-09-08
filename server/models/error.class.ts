
export namespace SERV_Error 
{
    interface ErrorMessage 
    {
        message: string; 
    }
    interface ErrorDetails 
    {
        message: ErrorMessage & string;
        name?: string;
        code?: number; 
    }
    
    type ErrorArg = ErrorMessage | ErrorDetails;


    export class Err extends Error 
    {
        
        code?: number;
        constructor (err: ErrorArg)
        {
            const desc =  (typeof err === 'string') ? err : err.message ;
            super (desc);
            const { message, name, code } = err as ErrorDetails;
            this.name = name || desc;
            this.code = code || -1 ;
        

        }
    }


    export class SessionError extends Err 
    {
        constructor (...args:any)
        {
            super({...args});
            this.name = 'UserSessionError';
            this.code = 400;

        }    
    }
}