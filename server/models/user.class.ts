export class User {

    id: number; 
    name: string | null; 
    email: string ; 
    status?: string; 
    role?: string; 
    created?: Date | number;
    modified?: Date | number;
    createdBy?: number;
    
    constructor ({id, email, role, name, createdBy, status, created, modified }: User )
    {
        this.id = id;
        this.name = name || email; 
        this.email = email ;
        this.role = role;
        this.status = status;
        this.created = created ? new Date (created) : new Date () ;
        this.modified = modified ?  new Date (modified) : new Date ();
        this.createdBy = createdBy;
    }
}

export class UserWithCred extends User {

    pwd?: string | null;
    salt?: string | null;

    constructor (data: User , pwd:string, salt:string ) 
    {
        super(data);
        this.pwd = pwd || null;
        this.salt = salt || null;
    }
}

