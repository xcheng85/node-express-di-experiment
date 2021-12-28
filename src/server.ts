import express, { Application, Handler } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import helmet from 'helmet';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import { Container } from 'inversify';
import { PlayerService } from './services/player';
import TYPES from './constants/type';
import customErrorHandler from './middlewares/custom-error-handler';

export class Server {
    private readonly _instance: Application;

    get instance(): Application {
        return this._instance;
    }

    constructor() {
        let container = new Container();
        container.bind<PlayerService>(TYPES.PlayerService).to(PlayerService);
        // start the server
        let server = new InversifyExpressServer(container);
        this._instance = server.build();
        this.configureMiddlewares();
    }

    private configureMiddlewares() {
        this._instance.use(express.json());
        // support application/json type post data
        // support application/x-www-form-urlencoded post data
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this._instance.use(helmet());
        this._instance.use(express.json({ limit: '100mb' }));
        this._instance.use(express.urlencoded({ limit: '100mb', extended: true }));
        this._instance.use(cors());
        this._instance.use(customErrorHandler);
    }
}

export default new Server();