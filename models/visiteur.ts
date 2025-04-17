import { Schema, model, Document } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';
import dotenv from 'dotenv';

dotenv.config();

interface IVisiteur extends Document {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    emailHash: string;
    date_embauche: Date;
    password: string;
    visites: string[];
    praticiens: Schema.Types.ObjectId[];
}
  
  const visiteurSchema = new Schema<IVisiteur>({
    nom: {
      type: String,
      required: false
    },
    prenom: {
      type: String,
      required: false
    },
    tel: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true, 
      unique: true
    },
    emailHash: {
      type: String,
      required: true,
      unique: true, 
    },
    date_embauche: {
      type: Date,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    visites: [{
      type: Schema.Types.ObjectId,
      ref: 'Visite'
    }],
    praticiens: [{ type: Schema.Types.ObjectId, ref: 'Praticien' }],
  });
  
// Vérification de la clé secrète
const secret = process.env.MONGOOSE_ENCRYPTION_SECRET;
if (!secret) {
  throw new Error('La variable MONGOOSE_ENCRYPTION_SECRET n\'est pas définie.');
}

visiteurSchema.plugin(mongooseEncryption, {
  secret: secret,
  encryptedFields: ['nom', 'prenom', 'tel', 'date_embauche']
});

const Visiteur = model<IVisiteur>('Visiteur', visiteurSchema);
export default Visiteur;