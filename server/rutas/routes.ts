import { Router } from 'express';
import { getMensajes, getUsuarios, postMensaje } from '../controladores/routes.controller';
const router = Router();

router.get('/mensajes', getMensajes);

router.post('/mensajes/:id', postMensaje);

router.post('/mensajes', postMensaje);

router.get('/usuarios', getUsuarios);

export default router;