import HashHelper from "../helpers/hash.helper.ts";
import { User } from "../models/user.model.ts";
import TokenService from "./token.service.ts";
import { throwError } from '../middleware/errorHandler.middleware.ts';
import { Status } from '../../dependency.ts';

class AuthService {
    static async login ({email, password}: {email: string, password: string}){
        let user = await User.findOne({email, isDisabled: false})
        if(user && user.password && await HashHelper.compare(password, user.password)){
         const token = await TokenService.generateToken(user._id);
         const {_id, name, email, createdAt, updatedAt} = user;
         return {
            id: _id.toString(),
            token,
            name,
            email,
            createdAt,
            updatedAt
         }
      }else{
        throwError({
            type: "Unauthorized",
            message: "Email or password is wrong",
            name: "Unauthorized",
            path: "login",
            status: Status.Unauthorized
        })
      }
    }
}

export default AuthService
