import { Status } from '../../dependency.ts';
import { Err } from '../types/types.interfaces.ts';

export const throwError = (err: Err) => {
    throw err;
}

export const errorHandler  = async (ctx: any, next: any) => {
    try {
        await next()
    } catch (error) {
        console.log("Error ", error)
        const {message, type, name, path }: Err  = error
        const status = error.status || error.statusCode || Status.InternalServerError
        ctx.response.status = status;
        ctx.response.body = {
            message, type, name, path 
        }
    }
}