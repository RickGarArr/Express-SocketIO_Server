import { Server, Socket } from "socket.io";
import SocketError from "../clases/SocketError";
import Usuarios from '../clases/Usuarios';
import Usuario from '../clases/Usuario';

export default class SocketMethods {

    private static clientesConectados: Usuarios = new Usuarios();
    
    constructor() {

    }

    public static desconectar(cliente: Socket) {
            cliente.on('disconnect', () => {
            console.log('Cliente desconectado, cliente: ', cliente.id);
            this.clientesConectados.deleteUsuario(cliente.id);
        });
    }

    public static escucharMensaje(cliente: Socket, io: Server) {
        cliente.on('mensaje', (mensaje) => {
            console.log(mensaje);
            io.emit('mensaje-nuevo', mensaje);
        });
    }
    
    public static login(cliente: Socket, io: Server) {
        cliente.on('login', (payload: {nombre: string} , callback: Function) => {
            SocketMethods.clientesConectados.renameUsuario(cliente.id, payload.nombre);
            console.log(payload.nombre);
            callback(new SocketError('Error al configurar usuario'), null);
        });
    }

    public static conectarCliente(cliente: Socket) {
        const usuario = new Usuario(cliente.id);
        SocketMethods.clientesConectados.addUsuario(usuario);
    }
}