//import elysia
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors'
//import routes
import Routes from './routes';

//initiate elysia
const app = new Elysia();

//route home
app.get('/', () => 'Hello Elysia!');

//add routes
app.group('/api', (app) => app.use(Routes))

//start server on port 3000

app.use(cors());
app.listen(3000);
 
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);