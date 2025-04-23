import { Router } from 'express';
import {createPraticien, getPraticiens, getPraticiensByVisiteur} from '../controllers/praticien';

const router = Router();

// Routes pour Praticien
router.post('/', createPraticien);
router.get('/', getPraticiens);
router.get('/byVisiteur/:id', getPraticiensByVisiteur);

export default router;