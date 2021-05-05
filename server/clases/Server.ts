import Express from 'express';
import io from 'socket.io';
import SocketMethods from '../sockets/sockets';
import http from 'http';

export default class LocalServer {

    private static _instance: LocalServer;

    private app: Express.Application;
    private static port: number = Number(process.env.PORT);
    private httpServer: http.Server;
    public io: io.Server;

    private constructor() {
        this.app = Express();
        this.httpServer = http.createServer(this.app);
        this.io = new io.Server(this.httpServer, {cors: {  origin: true, credentials: true }});
    }

    public static get instance() {
        return LocalServer._instance || (LocalServer._instance = new LocalServer());
    }

    public start(callback: Function): void {
        this.httpServer.listen(LocalServer.port, callback());
    }

    public escucharSockets() {
        console.log('Escuchando conexiones - socket');
        this.io.on('connection', (cliente: io.Socket) => {
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