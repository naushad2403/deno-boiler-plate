import {MongoClient} from '../../dependency.ts';
import config from '../../configs/config.ts';
const {dbName, mongoURI} = config
class db {
public client: MongoClient;
private dbName: string;
private mongoURI: string;
constructor(dbName: string, mongoURI: string){
    this.dbName = dbName;
    this.mongoURI = mongoURI;
    this.client = {} as MongoClient;
}
async connect () {
    const client = new MongoClient()
   await client.connect(this.mongoURI)
   console.log("=== DB connected")
   this.client = client;
}
get DB () {
    return this.client.database(this.dbName)
}
}

console.log("Db instance", dbName, mongoURI)
const dbInstance  = new db(dbName, mongoURI);
await dbInstance.connect()
export default dbInstance;