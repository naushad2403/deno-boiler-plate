import { Router } from '../../dependency.ts';
import AuthController from '../controller/auth.controller.ts';
const route: any  = new Router();
route.post("/api/auth/login", AuthController.login)
// route.post('api/user/login', user.login)
// route.post('api/user/forgetpassword',user.forgetPassword)
// route.post('api/user/updatepassword',user.updatePassword)
export default route;



