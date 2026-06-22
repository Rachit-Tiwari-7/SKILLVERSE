import { Router } from 'express';
import { createProposal, getProposals, updateProposalStatus } from '../controllers/proposals.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getProposals);
router.post('/', authenticate, createProposal);
router.patch('/:id', authenticate, updateProposalStatus);

export default router;
