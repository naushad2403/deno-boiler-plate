 import type { Header, Payload } from "../../dependency.ts";
 import { create, Status, verify } from "../../dependency.ts";
import { throwError } from "../middleware/errorHandler.middleware.ts";


 const key = await crypto.subtle.generateKey(
     { name: "HMAC", hash: "SHA-512" },
      true,
     ["sign", "verify"],
     );

class jwtHelper {   
    static generateToken(exp: number, id: string): Promise<string> {
        const now = Date.now(); // in millis
        const header: Header = {
            alg: "HS512",
            typ: "JWT",
        };
        const payload: Payload = {
            iss: "deno_rest",
            iat: now,
            id,
            exp,
        };

    return create(header, payload, key);
    }

    public static async getJwtPayload(token: string): Promise<Payload | Error> {
    try {
      return await verify(token, key);
    } catch (_e) {
      return throwError({
        status: Status.Unauthorized,
        name: "Unauthorized",
        path: "access_token",
        message: `access_token is not valid or expired`,
        type: "Unauthorized",
      });
    }
  }
}

export default jwtHelper;