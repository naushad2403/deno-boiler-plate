import dbInstance from '../services/db.ts';
export interface UserSchema {
    _id: string,
    name: string,
    email: string,
    password: string,
    docVersion: number,
    createdAt: Date,
    updatedAt: Date,
    isDisabled: boolean
}

export const User = dbInstance.DB.collection<UserSchema>("users")