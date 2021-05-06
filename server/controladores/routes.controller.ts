import { Request, Response } from 'express';
import SocketServer from '../server_clases/SocketServer';
import Usuarios from '../clases/Usuarios';

export function getMensajes(req: Request, res: Response) {
    res.json({
        ok: true,
        msg: 'Todo Esta Bien'
    })
}

export function postMensaje(req: Request, res: Response) {
    const IOServer = SocketServer.instance;
    const { de, cuerpo } = req.body;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }
    !id ? IOServer.io.emit('mensaje-nuevo', payload) : IOServer.io.in(id).emit('mensaje-privado', payload);
    res.json({
        de,
        cuerpo,
        id
    });
}

export function getUsuarios(req: Request, res: Response) {
    res.json({
        sockets: Usuarios.getUsuarios()
    });
}

// const server = LocalServer.instance;
// let clientes = new Set<String>();
// clientes = await server.io.allSockets();
// let ids = new Array<String>();
// clientes.forEach(value => {
//     console.log(value);
//     ids.push(value);
// }); 