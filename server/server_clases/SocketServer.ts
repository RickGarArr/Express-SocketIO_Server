import socket_io from 'socket.io';
import SocketMethods from '../sockets/SocketsMethods';
import RESTServer from './RESTServer';


export default class IOServer {
    
    private static _instance: IOServer;

    private restServer = RESTServer.instance;
    private _io: socket_io.Server;
    
    private constructor() {
        this._io = new socket_io.Server(this.restServer.httpServer, {cors: {  origin: true, credentials: true }});
    }

    public static get instance() {
        return IOServer._instance || (IOServer._instance = new IOServer());
    }

    public get io() {
        return this._io;
    }


    public escucharSockets() {
        console.log('Escuchando conexiones - socket');
        this.io.on('connection', (cliente: socket_io.Socket) => {
            // primer paso
            SocketMethods.conectarCliente(cliente);
            //login
            SocketMethods.login(cliente, this.io);
            // 
            SocketMethods.obtenerUsuarios(cliente, this.io);
            //mensaje
            SocketMethods.escucharMensaje(cliente, this.io);
            // Desconnexion
            SocketMethods.desconectar(cliente, this.io);
        });
    }

}