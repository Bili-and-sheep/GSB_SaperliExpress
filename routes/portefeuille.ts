import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getPortefeuille, addPraticienToPortefeuille } from '../controllers/portefeuille';

const router = Router();

router.use(authMiddleware);

// GET /api/portefeuille
router.get('/', getPortefeuille);

// POST /api/portefeuille/add
router.post('/add', addPraticienToPortefeuille);

export default router;