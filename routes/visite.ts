import { Router } from 'express';
import {
    createVisite,
    getVisites,
    getVisitesByPraticien,
    updateVisite
} from '../controllers/visite';
import {authMiddleware} from "../middleware/auth";


const router = Router();

// Routes pour Visite
router.post('/', authMiddleware, createVisite);
router.get('/', authMiddleware, getVisites);
router.get('/vbyp', getVisitesByPraticien);
router.put('/updateVisite/:id', updateVisite);

export default router;