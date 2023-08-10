import dotenv from 'dotenv';
import Sqlitex from 'sqlite-x';

dotenv.config ();

const ISHTTPS: boolean = process.env.HTTPS ? true : false;

const HTTP_SCHEME: string = ISHTTPS ? 'https' : 'http';
const FILE_DBNAME: string = 'db/hippik.db';
const PORT_NUM: string = String (8000);
const HOST_NAME: string = 'localhost';

const env = <dotenv.DotenvPopulateInput>process.env;
const envSettings = {
    PORT: PORT_NUM,
    DB: FILE_DBNAME,
    HOST: HOST_NAME,
    SCHEME: HTTP_SCHEME
} as dotenv.DotenvPopulateInput; 

dotenv.populate (env, envSettings);

const db = new Sqlitex (String (process.env.DB));

export default db ;