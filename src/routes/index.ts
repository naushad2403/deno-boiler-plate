import { Application } from 'https://deno.land/x/oak/mod.ts';
import user from './user.route.ts';
import auth from './auth.route.ts';

const init = (app: Application) => {
    app.use(user.routes())
    app.use(user.allowedMethods())
    app.use(auth.routes())
    app.use(auth.allowedMethods())
}


export   {
    init
}