import { Status } from '../../dependency.ts';

export interface Err {
status: Status,
message: string,
type:string,
name:string,
path:string
}

export interface UserStructure {
  name: string;
  email: string;
  password: string;
}