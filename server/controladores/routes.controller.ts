import { Request, Response }  from 'express';

export function getMensajes(req: Request, res: Response) {
    res.json({
        ok: true,
        msg: 'Todo Esta Bien'
    })
}

export function postMensaje(req: Request, res: Response) {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: 'Post Mensaje',
        id
    });
}