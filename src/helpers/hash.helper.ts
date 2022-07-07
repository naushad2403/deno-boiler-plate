import { genSalt, hash, compare } from "../../dependency.ts";

class HashHelper {
    static async encrypt(password: string): Promise<string> {
        const salt = await genSalt(8)
        return await hash(password, salt)
    }
    static async compare(plain: string, _hashed: string): Promise<boolean> {
       return await compare(plain, _hashed)
    }
}

export default HashHelper;