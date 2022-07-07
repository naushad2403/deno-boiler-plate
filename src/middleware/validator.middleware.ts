import { RouteParams, RouterContext } from "https://deno.land/x/oak@v10.6.0/router.ts";
import {signupValidation}  from "../yup_schema/user.schema.ts"
import { Status } from '../../dependency.ts';
import { throwError } from './errorHandler.middleware.ts';

export const validateSignup =  async (ctx: any, next: any) => {
   const body = ctx.request.body()
   const {name, email, password} = await body.value
   try {
    const validationResult =  await signupValidation.validate({name, email, password});
     await next()
   } catch (error) {
    throwError ({...error, status: Status.BadRequest})
   }
}