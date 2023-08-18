import db from '../../db/db_control';
import { Contest, ContestList, ContestTrial } from '../models/contest.class';
import { Participant } from '../models/participant.class';
import User from '../models/user.class';




//Users
async function getAccountByNameOrMail (user: string, isEmail: boolean = false ) {
  try
  { 
    console.log (user)
    if (!user.length) return false;
    db.db
    const result = await db.get`SELECT * FROM accounts` ; // WHERE ${isEmail ? 'email' : 'name'}=${user}`;
    console.log ((result));
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
        let {id, name, createdDate, modifiedDate, status} = data;
        await db.run`UPDATE contests \
            SET name=${name}, location=${location}, created=${createdDate}, modified=${modifiedDate}, status=${status} \
                WHERE id=${id}`;
    }
    catch (err)
    { 
        throw err;
    }
}


async function createAccount (data: User)  {
    try 
    {
        let {id, name, createdDate, modifiedDate, status} = data;
        if (!id || isNaN (id) || id < 1) 
        {
            id = 0;
            await db.run`INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${createdDate}, ${modifiedDate}, ${status})`;
        }
        
    }
    catch (err)
    { 
        throw err;
        
    }
}



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