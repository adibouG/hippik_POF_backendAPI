export class Participant {

    id?: number; 
    name?: string; 
    email?: string; 
    status?: string; 
    createdDate?: Date;
    modifiedDate?: Date;
    createdBy?: number;

    constructor (
        id?: number, name?: string, createdBy?: number, status?: string,
                createdDate?: Date, modifiedDate?: Date
    )
    {
        if (id) this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now ()).toString () ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.createdBy = createdBy;
        }
    }

}

export class Team {

    id?: number; 
    name?: string; 
    email?: string; 
    status?: string; 
    createdDate?: Date;
    modifiedDate?: Date;
    createdBy?: number;

    constructor (
        id?: number, name?: string, createdBy?: number, status?: string,
                createdDate?: Date, modifiedDate?: Date
    )
    {
        if (id) this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now ()).toString () ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.createdBy = createdBy;
        }
    }

}

export class Horse {

    id?: number; 
    name?: string; 
    email?: string; 
    status?: string; 
    createdDate?: Date;
    modifiedDate?: Date;
    createdBy?: number;

    constructor (
        id?: number, name?: string, createdBy?: number, status?: string,
                createdDate?: Date, modifiedDate?: Date
    )
    {
        if (id) this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now ()).toString () ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.createdBy = createdBy;
        }
    }

}