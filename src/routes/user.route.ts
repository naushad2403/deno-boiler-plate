import { Router } from '../../dependency.ts';
import UserController from '../controller/user.controller.ts'
import { validateSignup } from '../middleware/validator.middleware.ts';
const route: any  = new Router();
route.post("/api/user/signup", validateSignup, UserController.signup)
export default route;



