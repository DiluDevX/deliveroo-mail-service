import { Router } from 'express';
import { requestPasswordReset } from '../controllers/mail.controller';

const router = Router();

router.post('/password-reset', requestPasswordReset);

export default router;
