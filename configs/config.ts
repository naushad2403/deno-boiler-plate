import {configSync} from '../dependency.ts'
const env: string = Deno.env.get("ENV") || "development"
const envPath: string = `environments/.env.${env}`.toString()
const configuredFile = configSync({
    path: envPath,
    export: true
})
console.log(envPath, 'port', configuredFile)

const config = {
    env: Deno.env.get("ENV"),
    jwtAccessExpiration: Number(Deno.env.get("JWT_ACCESS_TOKEN_EXP")) as unknown as number,
    jwtRefreshExpiration: Number(Deno.env.get("JWT_REFRESH_TOKEN_EXP")) as unknown as number,
    port:  Deno.env.get("PORT") as unknown as number,
    mongoURI: Deno.env.get("MONGO_URI") as string,
    dbName: Deno.env.get("DB_NAME") as string 
}

export default config