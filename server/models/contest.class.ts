class ImageFile {
    file: string;
    type: string;
    id?:number;
    account?: number;
    constructor (file: string, type: string, id?:number, accountId?: number)
    {
        this.file = file;
        this.type = type;
        this.id  = id;
        this.account = accountId;
    }
}


class Contest {

    id?: number; 
    name: string; 
    startDate?: Date; 
    location: string; 
    userId: number;
    desc?: string; 
    endDate?: Date; 
    status?: string; 
    createdDate?: Date;
    modifiedDate?: Date;
    images?:Array<ImageFile|string>
    

    constructor ({ id, name, userId, location, desc,
        startDate, endDate, status, images,
        createdDate, modifiedDate }: Contest)
    {
            this.id = id;
            this.name = name || (Date.now ()).toString () ;
            this.desc = desc;
            this.location = location ;
            this.startDate = startDate || new Date ();
            this.endDate = endDate ;
            this.status = status;
            this.createdDate = createdDate || new Date () ;
            this.modifiedDate = modifiedDate || new Date ();
            this.userId = userId;
            if (images && images.length) 
            {
                images.map ((el => {
                    if (typeof el === 'string') 
                    {
                        return new ImageFile (el, 'contest', undefined ,this.userId);
                    }
                }))
            }
        
            this.images = images || [];
        
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

export { Contest, ContestList, ContestTrial, ImageFile };