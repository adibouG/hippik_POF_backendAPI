import dotenv from 'dotenv';
const Sqlitex: any = require ("sqlite-x");

const ISHTTPS: boolean = false;
const FILE_DBNAME: string = 'db/hippik_db.sql3';
const PORT_NUM: string = String (8000);
const HOST_NAME: string = 'localhost';
const HTTP_SCHEME: string = ISHTTPS ? 'https' : 'http';

const env = <dotenv.DotenvPopulateInput>process.env;
const Setting = <dotenv.DotenvPopulateInput> {PORT: PORT_NUM, DB: FILE_DBNAME, HOST: HOST_NAME, SCHEME: HTTP_SCHEME};
dotenv.populate (env, Setting);

const db = new Sqlitex (process.env.DB);


db.getAccount = async (id?: number) => {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM accounts WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    return result;
  };
  
  db.getAccounts = async () => { 
    const result = await db.get`SELECT * FROM accounts`;
    console.log (JSON.stringify(result));
    return result;
  };

  db.getContests = async () => { 
    const result = await db.get`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
  };

  db.getContest = async (id?: number) => {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM contests WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    return result;
  };

  db.postContest = async (id: number, data: {}) => {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM contests WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    return result;
  };

export default db;