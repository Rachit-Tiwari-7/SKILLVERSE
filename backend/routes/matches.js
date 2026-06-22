import { Router } from 'express';
import { getMatches, createMatch, updateMatchStatus } from '../controllers/matches.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getMatches);
router.post('/', authenticate, createMatch);
router.patch('/:id', authenticate, updateMatchStatus);

export default router;
