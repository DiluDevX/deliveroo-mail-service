import { Router } from 'express';
import { validateBody } from '../middleware/validate.middleware';
import { requestPasswordReset } from '../controllers/mail.controller';
import { resetPasswordBodySchema } from '../schemas/mail.schema';

const router = Router();

router.post('/send/password-reset', validateBody(resetPasswordBodySchema), requestPasswordReset);

export default router;
