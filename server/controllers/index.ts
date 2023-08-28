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
    if (isEmail) result = await db.get`SELECT accounts.*, account_status.status FROM accounts LEFT JOIN account_status ON accounts.status = account_status.id WHERE email = ${user}` ;
    else result = await db.get`SELECT accounts.*, account_status.status FROM accounts LEFT JOIN account_status ON accounts.status = account_status.id WHERE name = ${user}` ;          
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
    const result = await db.get`SELECT accounts.*, account_status.status FROM accounts LEFT JOIN account_status ON accounts.status = account_status.id WHERE id = ${id}`;
    console.log (JSON.stringify(result));
    return result;
};

async function getAccounts () { 
    const result = await db.all`SELECT * FROM accounts `;
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
            const createdStamp = created?.valueOf () || Date.now ();
            const modStamp = modified?.valueOf () || Date.now ();
            const row = await db.get(`SELECT statusId FROM account_status WHERE status = ${status}`) ;
            await db.run(`INSERT INTO accounts (name, email, status, created, modified, pwd, salt) \
                            VALUES (${name}, ${email}, ${row.id}, ${createdStamp}, ${modStamp}, ${pwd}, ${salt})` )
            const newUser = await getAccountByNameOrMail (name, false);  
            if (!newUser.id) throw new Error (`Could not create ${name} - ${email} user account`) ;
            return newUser;
        }                 /*, 
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
        
        
    }
    catch (err)
    { 
        throw err;
        
    }
}
//AccountStatus

async function getAccountStatus (status?: number | string | null) {
    if (!status) return  await db.all`SELECT * FROM account_status` ;
    if (String(status).length > 1 && typeof status === 'string') return  await db.get`SELECT * FROM account_status WHERE status = ${status}`;
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
        let {name, location, startDate, endDate, createdDate, modifiedDate, status} = data;
      
        const row = await db.run`INSERT INTO contests(name, location, statdate, enddate, created, modified, status) \
                VALUES (${name}, ${location}, ${startDate}, ${endDate}, ${createdDate}, ${modifiedDate}, ${status})`;
        return row;        
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


async function addImage (userId: number, file: string, type: number): Promise<any>  {
    
    
    const result = await db.run`INSERT INTO images (account, file, type) \
                    VALUES (${userId}, ${file}, (SELECT id FROM image_types WHERE type=${type}))`;
    console.log (JSON.stringify(result));
    return result.lastID;
}


async function getImagesByTypeOrId (type?: string, id?: number) : Promise<any>  {
    let results ;    
    if (type && !id) 
    {   
        results = await db.getAll `SELECT images.id, images.account, images.file, image_types.type \
        FROM images LEFT JOIN image_types ON images.type = image_types.id \
        WHERE image_types.type = ${type}`
 
    }
    else if (id && !type)
    {
        results = await db.get `SELECT images.id, images.account, images.file, image_types.type \
        FROM images LEFT JOIN image_types ON  images.type = image_types.id \
        WHERE images.id = ${id}`;
    }
    else if (type && id)
    {
        results = await db.getAll `SELECT images.id, images.file, image_types.type \
        FROM images LEFT JOIN image_types ON  images.type =  image_types.id \
        WHERE image_types = ${type} AND images.account = ${id}` ;
        
    }
    else
    {
        results = await db.getAll `SELECT images.id, images.file, image_types.type \
        FROM images LEFT JOIN image_types ON images.type = image_types.id ` ;
    }
 }



export { 
    addImage,
    getImagesByTypeOrId,
    getAccountByNameOrMail,
    getAccount, 
    getAccounts, 
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountStatus,
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