import express from 'express';
import mongoose from 'mongoose';
import visiteurRoutes from './routes/visiteur';
import motifRoutes from './routes/motif';
import praticienRoutes from './routes/praticien';
import visiteRoutes from './routes/visite';

import dotenv from 'dotenv';
dotenv.config();



const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Routes
app.use('/api/visiteurs', visiteurRoutes);
app.use('/api/motifs', motifRoutes);
app.use('/api/praticiens', praticienRoutes);
app.use('/api/visites', visiteRoutes);

// Récupérer les variables d'environnement
const mongoUri = process.env.MONGO_URI as string;


// MongoDB Connection
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected 🦆');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

export default app;


