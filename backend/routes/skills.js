import { Router } from 'express';
import { createSkill, listSkills, deleteSkill } from '../controllers/skills.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', listSkills);
router.post('/', authenticate, createSkill);
router.delete('/:id', authenticate, deleteSkill);

export default router;
