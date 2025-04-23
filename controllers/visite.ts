import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Visite from '../models/visite';
import Praticien from '../models/praticien';


// Création d'une visite
export const createVisite = asyncHandler(async (req: Request, res: Response) => {
  const visite = new Visite(req.body);
  const savedVisite = await visite.save();

  // Ajouter la visite au praticien concerné
  await Praticien.findByIdAndUpdate(
      visite.praticien,
      { $push: { visites: savedVisite._id } },
      { new: true }
  );

  res.status(201).json(savedVisite);
});
// Récupération de toutes les visites
export const getVisites = asyncHandler(async (_req: Request, res: Response) => {
  const visites = await Visite.find().populate('visiteur praticien motif');
  res.status(200).json(visites);
});


// Récupération des visites par praticien
export const getVisitesByPraticien = asyncHandler(async (req: Request, res: Response) => {
  const praticienId = req.query.praticienId;

  if (!praticienId) {
    res.status(400).json({ message: "praticienId requis en paramètre" });
    return;
  }

  const visites = await Visite.find({ praticien: praticienId }).populate('visiteur praticien motif');
  res.status(200).json(visites);
});

// Mise à jour d'une visite
export const updateVisite = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updated = await Visite.findByIdAndUpdate(id, req.body, { new: true });

  if (!updated) {
    res.status(404).json({ message: "Visite non trouvée" });
    return;
  }

  res.status(200).json(updated);
});
