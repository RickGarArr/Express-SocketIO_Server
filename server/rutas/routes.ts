import { Router } from 'express';
import { getMensajes, postMensaje } from '../controladores/routes.controller';
const router = Router();

router.get('/mensajes', getMensajes);

router.post('/mensajes/:id', postMensaje);

export default router;