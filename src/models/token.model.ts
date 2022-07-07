import dbInstance from '../services/db.ts';
export interface TokenSchema{
    _id: string,
     token: string,
     user: string,
     expires: Date,
     type: string,
     createdAt: Date,
     blacklisted:boolean

}

export const Token =  dbInstance.DB.collection<TokenSchema>("tokens")