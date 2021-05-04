import Express from 'express';
import { Server, Socket } from 'socket.io';
import SocketMethods from '../sockets/sockets';
import http from 'http';

export default class LocalServer {

    private static instance: LocalServer;

    private app: Express.Application;
    private static port: number = Number(process.env.PORT);
    private httpServer: http.Server;
    private io: Server;

    private constructor() {
        this.app = Express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {cors: {  origin: true, credentials: true }});
    }

    public static getInstance() {
        return LocalServer.instance || (LocalServer.instance = new LocalServer());
    }

    public start(callback: Function): void {
        this.httpServer.listen(LocalServer.port, callback());
    }

    public escucharSockets() {
        console.log('Escuchando conexiones - socket');
        this.io.on('connection', (cliente: Socket) => {
            console.log('cliente conectado, cliente: ', cliente.id);

            SocketMethods.conectarCliente(cliente);
            //login
            SocketMethods.login(cliente, this.io);
            //mensaje
            SocketMethods.escucharMensaje(cliente, this.io);
            // Desconnexion
            SocketMethods.desconectar(cliente);
        });
    }

    public getApp(): Express.Application {
        return this.app;
    }

    public getPort(): number {
        return LocalServer.port;
    }
}