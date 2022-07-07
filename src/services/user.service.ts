import { UserStructure } from '../types/types.interfaces.ts';
import { User } from '../models/user.model.ts';
import { throwError } from '../middleware/errorHandler.middleware.ts';
import { Err } from '../types/types.interfaces.ts';
import HashHelper from '../helpers/hash.helper.ts';
import { Status } from "../../dependency.ts"
class UserService {
    static async create(params: UserStructure) {
        const {name, email, password} = params;
        const user = await User.findOne({email})
        if(user) {
            throwError({
                status: Status.BadRequest,
                message: "User already exist, kindly login",
                type: "Illegel operation",
                name:"Invalid user signup",
                path:"User"
            })
        }else{
            const hashedPassword = await HashHelper.encrypt(password)
            const dateCreated = new Date()
            const user =await User.insertOne({
                name,
                email,
                password: hashedPassword,
                createdAt: dateCreated,
                updatedAt: dateCreated,
                isDisabled: false,
                docVersion: 1
            })
            if(user) {
                return user
            }else{
                return throwError({
                status: Status.BadRequest,
                name: "BadRequest",
                path: "user",
                message: `Could not create user`,
                type: "BadRequest",
      });
            }
        }
    }
}

export default UserService;