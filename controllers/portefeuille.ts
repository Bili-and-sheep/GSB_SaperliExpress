import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../@types/express';
import Visiteur from '../models/visiteur';
import Praticien from '../models/praticien';


export const getPortefeuille = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const visiteurId = req.auth?.visiteurId;
        if (!visiteurId) {
            res.status(401).json({ message: 'Non authentifié' });
            return;
        }

        const visiteur = await Visiteur.findById(visiteurId)
            .populate({
                path: 'praticiens',
                select: 'nom prenom tel email rue code_postal ville visites'
            });

        if (!visiteur) {
            res.status(404).json({ message: 'Visiteur non trouvé' });
            return;
        }

        res.status(200).json({
            _id: visiteur._id,
            email: visiteur.email,
            password: visiteur.password,
            visites: visiteur.visites,
            __v: visiteur.__v,
            portefeuillePraticiens: visiteur.praticiens,
            nom: visiteur.nom,
            prenom: visiteur.prenom,
            tel: visiteur.tel,
            date_embauche: visiteur.date_embauche
        });
    }
);

export const addPraticienToPortefeuille = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const visiteurId = req.auth?.visiteurId;
        const { praticien_id } = req.body;

        if (!visiteurId) {
            res.status(401).json({ message: 'Non authentifié' });
            return;
        }

        //Vérifier le praticien
        const praticien = await Praticien.findById(praticien_id);
        if (!praticien) {
            res.status(404).json({ message: 'Praticien non trouvé' });
            return;
        }

        //Charger et mettre à jour le visiteur
        const visiteur = await Visiteur.findById(visiteurId);
        if (!visiteur) {
            res.status(404).json({ message: 'Visiteur non trouvé' });
            return;
        }
        if (visiteur.praticiens.includes(praticien_id)) {
            res.status(400).json({ message: 'Praticien déjà dans le portefeuille' });
            return;
        }

        visiteur.praticiens.push(praticien_id);
        await visiteur.save();

        res.status(200).json({ message: 'Praticien ajouté au portefeuille' });
    }
);