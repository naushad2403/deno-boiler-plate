import { Status } from "../../dependency.ts";
import { throwError } from '../middleware/errorHandler.middleware.ts';
import config from '../../configs/config.ts';
import jwtHelper from '../helpers/jwt.helper.ts';
import { Token } from '../models/token.model.ts';
class TokenService {
   static async generateToken (userId: string) {
    if(!userId) {
        throwError({
            status: Status.BadRequest,
            message: "User id can't be null",
            name: "Invalid request",
            path: "user",
            type: "Not found"

        })
    }
    const now = Date.now()
    const accessTokenExp = (now + config.jwtAccessExpiration * 1000)
    const accessToken = await jwtHelper.generateToken(accessTokenExp, userId)
    const refreshTokenExp = (now + config.jwtRefreshExpiration * 1000)
    const refreshToken = await jwtHelper.generateToken(refreshTokenExp, userId)
    await Token.insertOne({
        token: refreshToken,
        user: userId,
        type: "refresh",
        expires: new Date(refreshTokenExp),
        blacklisted: false,
        createdAt: new Date()
    })
    return {
        access : {
            token: accessToken,
            expires: new Date(accessTokenExp)
          },
          refresh : {
            token: accessToken,
            expires: new Date(refreshTokenExp)
          }
        }
    } 
    
    static async verifyToken (token: string, type: string) {
      const userID = await jwtHelper.getJwtPayload(token);
      if(userID) {
        const tokenDoc = await Token.findOne({
            token, type, user: userID, blacklisted: false
        })
        if(tokenDoc) {
            return tokenDoc;
        }
      }else{
        throwError({
            type: "Unauthorised",
            name: "Not found",
            path: "access_token",
            message: "Email or password is wrong",
            status: Status.Unauthorized
        })
      }
    }
}   

export default TokenService;