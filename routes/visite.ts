import { Router } from 'express';
import {
    createVisite,
    deleteVisite, getVisiteById,
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
router.delete('/deletevisite/:id', deleteVisite);
router.get('/:id', getVisiteById)

export default router;