import { Router } from 'express';
import { getMensajes, postMensaje } from '../controladores/routes.controller';
const router = Router();

router.get('/mensajes', getMensajes);

router.post('/mensajes/:id', postMensaje);

router.post('/mensajes', postMensaje);

export default router;