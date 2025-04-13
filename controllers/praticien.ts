import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Praticien from '../models/praticien';

// Création d'un praticien
export const createPraticien = asyncHandler(async (req: Request, res: Response) => {
  const praticien = new Praticien(req.body);
  const savedPraticien = await praticien.save();
  res.status(201).json(savedPraticien);
});

export const getPraticiens = asyncHandler(async (_req: Request, res: Response) => {
  const praticiens = await Praticien.find()
      .populate({
        path: 'visites',
        populate: [
          { path: 'visiteur', model: 'Visiteur' },
          { path: 'motif', model: 'Motif' }
        ]
      })
  res.status(200).json(praticiens);
});


