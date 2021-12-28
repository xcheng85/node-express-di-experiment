import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import { Container } from 'inversify';
import { PlayerService } from './services/player';
import TYPES from './constants/type'; 
import customErrorHandler from './middlewares/custom-error-handler';

// load everything needed to the Container
let container = new Container();
 container.bind<PlayerService>(TYPES.PlayerService).to(PlayerService);
// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);
serverInstance.use(customErrorHandler);

console.log('Server started on port 3000 :)');