import { Router } from 'express';
import { getProfile, updateProfile, searchUsers } from '../controllers/users.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/search', authenticate, searchUsers);
router.get('/:id', getProfile);
router.put('/me', authenticate, updateProfile);

export default router;
