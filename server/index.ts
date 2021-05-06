// configuracion inicial
import dotenv from 'dotenv';
dotenv.config();
// importaciones necesarias
import { json, urlencoded } from 'express';
import CORS from 'cors';
// server classes
import LocalServer from './server_clases/RESTServer';
import SocketServer from './server_clases/SocketServer';

const server = LocalServer.instance;
const io = SocketServer.instance;

server.app.use(json());
server.app.use(urlencoded({extended: true}));
server.app.use(CORS({origin: true, credentials: true }));

import routes from './rutas/routes';
server.app.use('/', routes);

io.escucharSockets();

server.start(() => {
    console.log('Servidor escuchando en el puerto:', server.port);
});