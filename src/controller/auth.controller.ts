
import { Status } from "../../dependency.ts";
import AuthService from '../services/auth.service.ts';
class AuthController {
    static async login(ctx:any, next:any){
    console.log("ctx login", ctx)
      const body =  ctx.request.body() 
      const {email, password} = await body.value;
      const user =  await AuthService.login({email, password})
      console.log("USer", user)
      if(user){
        ctx.response.body = {
            ...user
        }
      }
    }

}

export default AuthController;
