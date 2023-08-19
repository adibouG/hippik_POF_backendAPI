import db from '../../db/db_control';
import { Contest, ContestList, ContestTrial } from '../models/contest.class';
import { Participant } from '../models/participant.class';
import {User, UserWithCred} from '../models/user.class';

//Users
async function getAccountByNameOrMail (user: string, isEmail: boolean = false ) {
  try
  { 
    if (!user.length) return false;
    let result;
    if (isEmail) result = await db.get`SELECT * FROM accounts WHERE email = ${user}` ;
    else result = await db.get`SELECT * FROM accounts WHERE name = ${user}` ;
    console.log (result);
    return result;
  }
  catch (e) 
  {
    console.log (e)
    throw e;
  }  
};

async function getAccount (id?: number) {
    if (!id || isNaN (id) || id < 1) id = 1;
    const result = await db.get`SELECT * FROM accounts WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    return result;
};

async function getAccounts () { 
    const result = await db.all`SELECT * FROM accounts`;
    console.log (JSON.stringify(result));
    return result;
};

async function deleteAccount (id?: number) {
    if (!id || isNaN (id) || id < 1) id = 1
    await db.run`UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now ().toString ()} \
        WHERE id = ${id}`;
};


async function updateAccount (data: User) {
    try 
    {
        let {id, name, created, modified, status} = data;
        await db.run`UPDATE contests \
            SET name=${name}, location=${location}, created=${created}, modified=${modified}, status=${status} \
                WHERE id=${id}`;
    }
    catch (err)
    { 
        throw err;
    }
}


async function createAccount (data: UserWithCred)  {
    try 
    {
        const {name, email, pwd, salt, created, modified, status} = data;
        {   

            const createdStamp = created?.valueOf ();
            const modStamp = modified?.valueOf ();
            const row = await db.get(`SELECT statusId FROM account_status WHERE status = ${status}`) ;
            await db.run(`INSERT INTO accounts (name, email, status, created, modified) \
                            VALUES (${name}, ${email}, ${row.statusId}, ${created}, ${modified}})`) /*, 
                            {$name: name, $email: email, $created:createdStamp, $modified:modStamp, $status: row.statusId}, 
                      //db.db.serialize(function(){     
                //db.run(`BEGIN TRANSACTION`)
            await   db.run("INSERT INTO accounts (name, email, status, created, modified) \
                            VALUES ($name, $email, $created, $modified, $status)", 
                            {$name: name, $email: email, $created:createdStamp, $modified:modStamp, $status: row.statusId}, 
                            function(err){
                             if (err) {
                                 db.run("ROLLBACK TRANSACTION"); 
                                 throw err;
                             }
                             db.run("COMMIT TRANSACTION"); 
                             return this.lastID;
                            })  ;
                            */
            return await getAccountByNameOrMail (data.email, false);  
        }
        
    }
    catch (err)
    { 
        throw err;
        
    }
}
//AccountStatus

async function getAccountStatus (status?: number | string | null) {
    if (!status) return  await db.all`SELECT * FROM account_status` ;
    if (String(status).length && typeof status === 'string') return  await db.get`SELECT * FROM account_status WHERE status = ${status}`;
    return  await db.get`SELECT * FROM account_status WHERE statusId = ${status}`;
};


//Contests
async function getContests () { 
    const result = await db.all`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
} 
 
async function getContest (id?: number): Promise<Contest> {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM contests WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    const obj = new Contest (result);
    return obj;
}

async function deleteContest (id?: number) {
    if (!id || isNaN (id) || id < 1) id = 1
    await db.run`UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now ().toString ()} \
        WHERE id = ${id}`;
};

async function checkContest (data: Contest): Promise<any>  {
    const { name , startDate, location } = data;
    if (name?.length)
    {
        const result = await db.all`SELECT * FROM contests WHERE  name= ${name}`;
        console.log (JSON.stringify(result));

        if (result.length) 
        {
            const check = (d: Contest) => {
                let isSameLoc = false;                
                let isSameStartDate = false;                
                if (d.location === location) { isSameLoc = true; }
                if (d.startDate === startDate) { isSameStartDate = true; }
               
                return isSameLoc && isSameStartDate;
            }
            const obj =  result.filter (check);  
            return obj;
        }
    }
}

async function updateContest (data: Contest) {
    try 
    {
        let {id, name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
        await db.run`UPDATE contests \
            SET name=${name}, location=${location}, startdate=${startDate}, enddate=${endDate}, created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
    }
    catch (err)
    { 
        throw err;
    }
}

async function createContest (data: Contest)  {
    try 
    {
        let {id, name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
        if (!id || isNaN (id) || id < 1) 
        {
            id = 0;
            await db.run`INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
        }
        
    }
    catch (err)
    { 
        throw err;
        
    }
}

//Trial


async function getTrials () { 
    const result = await db.all`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
} 
 
async function getAllTrials () { 
    const result = await db.all`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
} 
 
async function getTrial (id?: number): Promise<Contest> {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM contests WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    const obj = new Contest (result);
    return obj;
}

async function deleteTrial (id?: number) {
    if (!id || isNaN (id) || id < 1) id = 1
    await db.run`UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now ().toString ()} \
        WHERE id = ${id}`;
};

async function checkTrial (data: Contest): Promise<any>  {
    const { name , startDate, location } = data;
    if (name?.length)
    {
        const result = await db.all`SELECT * FROM contests WHERE  name= ${name}`;
        console.log (JSON.stringify(result));

        if (result.length) 
        {
            const check = (d: Contest) => {
                let isSameLoc = false;                
                let isSameStartDate = false;                
                if (d.location === location) { isSameLoc = true; }
                if (d.startDate === startDate) { isSameStartDate = true; }
               
                return isSameLoc && isSameStartDate;
            }
            const obj =  result.filter (check);  
            return obj;
        }
    }
}

async function updateTrial (data: Contest) {
    try 
    {
        let {id, name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
        await db.run`UPDATE contests \
            SET name=${name}, location=${location}, startdate=${startDate}, enddate=${endDate}, created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
    }
    catch (err)
    { 
        throw err;
    }
}

async function createTrial (data: Contest)  {
    try 
    {
        let {id, name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
        if (!id || isNaN (id) || id < 1) 
        {
            id = 0;
            await db.run`INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
        }
        
    }
    catch (err)
    { 
        throw err;
        
    }
}




//Participant


async function getParticipants () { 
    const result = await db.all`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
} 
 

async function getAllParticipants () { 
    const result = await db.all`SELECT * FROM contests`;
    console.log (JSON.stringify(result));
    return result;
} 

async function getParticipant (id?: number): Promise<Contest> {
    if (!id || isNaN (id) || id < 1) id = 1
    const result = await db.get`SELECT * FROM contests WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    const obj = new Contest (result);
    return obj;
}

async function deleteParticipant (id?: number) {
    if (!id || isNaN (id) || id < 1) id = 1
    await db.run`UPDATE accounts \
        SET status=-1, modifiedDate=${Date.now ().toString ()} \
        WHERE id = ${id}`;
};

async function checkParticipant (data: Contest): Promise<any>  {
    const { name , startDate, location } = data;
    if (name?.length)
    {
        const result = await db.all`SELECT * FROM contests WHERE  name= ${name}`;
        console.log (JSON.stringify(result));

        if (result.length) 
        {
            const check = (d: Contest) => {
                let isSameLoc = false;                
                let isSameStartDate = false;                
                if (d.location === location) { isSameLoc = true; }
                if (d.startDate === startDate) { isSameStartDate = true; }
               
                return isSameLoc && isSameStartDate;
            }
            const obj =  result.filter (check);  
            return obj;
        }
    }
}

async function updateParticipant (data: Participant) {
    try 
    {
        let {id, name, createdDate, modifiedDate, status} = data;
        await db.run`UPDATE contests \
            SET name=${name},created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
    }
    catch (err)
    { 
        throw err;
    }
}

async function createParticipant (data: Contest)  {
    try 
    {
        let {id, name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
        if (!id || isNaN (id) || id < 1) 
        {
            id = 0;
            await db.run`INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
        }
        
    }
    catch (err)
    { 
        throw err;
        
    }
}


export { 
    getAccountByNameOrMail,
    getAccount, 
    getAccounts, 
    createAccount,
    updateAccount,
    deleteAccount,
    getContest, 
    getContests, 
    checkContest,
    createContest,
    updateContest,
    deleteContest,
    getTrial, 
    getTrials, 
    getAllTrials, 
    createTrial,
    checkTrial,
    updateTrial,
    deleteTrial,
    getParticipant, 
    getParticipants, 
    getAllParticipants, 
    checkParticipant,
    createParticipant,
    updateParticipant,
    deleteParticipant
} ;