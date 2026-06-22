import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messages.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:matchId', authenticate, getMessages);
router.post('/:matchId', authenticate, sendMessage);

export default router;
