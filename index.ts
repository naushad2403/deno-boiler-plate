import { Application } from './dependency.ts'
import config from './configs/config.ts';
import {init} from './src/routes/index.ts'
import { errorHandler } from './src/middleware/errorHandler.middleware.ts';
const {env, port} =  config;
const app = new Application();

app.use( async (ctx, next)=>{
  console.log("Request coming", ctx.request.url)
  await next()
})
app.use(errorHandler)
init(app)
app.addEventListener("listen", () => {
  console.log(`Current Environment: ${env}`);
});
await app.listen({ port: parseInt(port)});



