import { Request, Response }  from 'express';
import { Server } from 'socket.io';
import LocalServer from '../clases/Server';

export function getMensajes(req: Request, res: Response) {
    res.json({
        ok: true,
        msg: 'Todo Esta Bien'
    })
}

export function postMensaje(req: Request, res: Response) {
    const server = LocalServer.instance;
    
    const { de, cuerpo } = req.body;
    const id = req.params.id;

    
    const payload = {
        de,
        cuerpo
    }
    
    if (!id) {
        server.io.emit('mensaje-nuevo', payload);
    } else {
        server.io.in(id).emit('mensaje-privado', payload);
    }

    res.json({
        de,
        cuerpo,
        id
    });
}