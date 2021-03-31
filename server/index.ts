import LocalServer from './clases/Server';
const server = new LocalServer(3030);

import Express from 'express';
server.getApp().use(Express.json());
server.getApp().use(Express.urlencoded({extended: true}));

import CORS from 'cors';
server.getApp().use(CORS({origin: true, credentials: true}));

import routes from './rutas/routes';
server.getApp().use('/', routes);

server.escucharSockets();

server.start(() => {
    console.log('Servidor escuchando en el puerto: ', server.getPort());
});