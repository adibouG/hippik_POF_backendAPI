class Contest {

    id?: number; 
    name?: string; 
    desc?: string; 
    location?: string; 
    startDate?: Date; 
    endDate?: Date; 
    status?: string; 
    createdDate?: Date;
    modifiedDate?: Date;
    createdBy?: number;

    constructor (
        id?: number, name?: string, createdBy?: number, desc?: string, 
            location?: string, startDate?: Date, endDate?: Date, status?: string,
                createdDate?: Date, modifiedDate?: Date
    )
    {
        if (id) this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now ()).toString () ;
            this.desc = desc;
            this.location = location ;
            this.startDate = startDate || new Date ();
            this.endDate = endDate ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.createdBy = createdBy;
        }
    }
}

class ContestList  {

    list: Contest[];
    
    constructor (list: Contest[] ) {
        this.list = list;
        
    }

} 

class ContestTrial  {

    id?: number; 
    name?: string; 
    desc?: string; 
    location?: string; 
    contest?: number; 
    type?: number; 
    status?: number; 
    startDate?: Date; 
    endDate?: Date; 
    createdDate?: Date;
    modifiedDate?: Date;
    createdBy?: number;

    
    constructor (
        id?: number, name?: string, createdBy?: number, desc?: string, 
            location?: string, contest?: number, startDate?: Date, endDate?: Date, status?: number,
                createdDate?: Date, modifiedDate?: Date
    )
    {
        if (id) this.id = id;
        else {
            this.id = 0;
            this.name = name || (Date.now ()).toString () ;
            this.desc = desc;
            this.contest = contest ;
            this.location = location ;
            this.startDate = startDate || new Date ();
            this.endDate = endDate ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.createdBy = createdBy;
        }
    }
} 

export { Contest, ContestList, ContestTrial };