import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import CORS from 'cors';
import LocalServer from './clases/Server';

const server = LocalServer.instance;
const app: Express.Application = server.getApp();

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

app.use(CORS({origin: true, credentials: true }));

import routes from './rutas/routes';
app.use('/', routes);

server.escucharSockets();

server.start(() => {
    console.log('Servidor escuchando en el puerto:',server.getPort());
});