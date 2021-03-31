import Express from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

export default class LocalServer {

    private app: Express.Application;
    private port: number;
    private httpServer: http.Server;
    private io: Server;

    constructor(port: number) {
        this.port = port;
        this.app = Express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);
    }

    public start(callback: Function): void {
        this.httpServer.listen(this.port, callback());
    }

    public escucharSockets() {
        console.log('Escuchando conexiones - socket');
        this.io.on('connection', (cliente: Socket) => {
            console.log('cliente conectado');
        });
    }

    public getApp(): Express.Application {
        return this.app;
    }

    public getPort(): number {
        return this.port;
    }
}