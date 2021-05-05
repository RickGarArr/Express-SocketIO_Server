import { Server, Socket } from "socket.io";
import SocketError from "../clases/SocketError";
import Usuarios from '../clases/Usuarios';

export default class SocketMethods {
    
    constructor() {

    }

    public static desconectar(cliente: Socket) {
            cliente.on('disconnect', () => {
            Usuarios.deleteUsuario(cliente.id);
        });
    }

    public static escucharMensaje(cliente: Socket, io: Server) {
        cliente.on('mensaje', (mensaje) => {
            io.emit('mensaje-nuevo', mensaje);
        });
    }
    
    public static login(cliente: Socket, io: Server) {
        cliente.on('login', (payload: {nombre: string} , callback: Function) => {            
            Usuarios.renameUsuario(cliente.id, payload.nombre);
            callback(null, Usuarios.getUsuario(cliente.id));
        });
    }
    
    //este método se ejecuta cuando se conecta un nuevo socket
    public static conectarCliente(cliente: Socket) {
        new Usuarios(cliente.id);
    }
}