import { create, getNumericDate, Header, Payload, verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { Context, RouteParams, RouterContext, RouterMiddleware, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import UserService from "../services/user.service.ts";

class UserController {
    static async signup(ctx:any, next:any){
      const body =  ctx.request.body() 
      const {name, email, password} = await body.value;
      const user =  await UserService.create({name, email, password})
      if(user){
        ctx.response.body = {
          message: "User created successfully",
          status: Status.Created
        }
      } 
    }

   static async updatePassword(context:any, next: any){
      const body =  context.request.body({type: "json"})
      const bodyObject = await body.value;
      const email = bodyObject.get("email")
      const password = bodyObject.get("password")
      const confirmPassword = bodyObject.get("confirmPassword")
    }

    static async deleteAccount(context: any, next: any) {

    }
}

export default UserController;
