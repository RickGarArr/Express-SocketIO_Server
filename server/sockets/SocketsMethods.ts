import io from "socket.io";
import Usuarios from '../clases/Usuarios';
import Usuario from '../clases/Usuario';
import IUsuario from "../interfaces/IUsuario";

export default class SocketMethods {
    
    //este método se ejecuta cuando se conecta un nuevo socket sin configurar
    public static conectarCliente(cliente: io.Socket) {
        Usuarios.addUsuario(new Usuario(cliente.id));
    }
    
    // metodo para asignar un nombre a un usuario
    public static login(cliente: io.Socket, io: io.Server) {
        cliente.on('login', (usuario: IUsuario, callback: Function) => {
            // renombra al usuario conectado
            Usuarios.renameUsuario(cliente.id, usuario.nombre!);
            // regresa el callback con el usuario configurado
            callback(null, Usuarios.getUsuario(cliente.id));
            // emite la lista de usuarios ya configurados
            io.emit('usuarios-activos', { usuarios: Usuarios.getUsuarios() });
        });
    }
    
    // regresa el listado de usuarios
    public static obtenerUsuarios(cliente: io.Socket, io: io.Server) {
        // escucha peticion de la lista de usuarios
        cliente.on('obtener-usuarios', () => {
            io.to(cliente.id).emit('usuarios-activos', { usuarios: Usuarios.getUsuarios() });
        });
    }

    // socket para enviar un mensaje
    public static escucharMensaje(cliente: io.Socket, io: io.Server) {
        cliente.on('mensaje', (mensaje) => {
            io.emit('mensaje-nuevo', mensaje);
        });
    }
    
    // eliminar de la lista de usuarios el cliente que se desconecta
    public static desconectar(cliente: io.Socket, io: io.Server) {
        cliente.on('disconnect', () => {
            Usuarios.deleteUsuario(cliente.id);
            io.emit('usuarios-activos', { usuarios: Usuarios.getUsuarios() });
        });
    }


}