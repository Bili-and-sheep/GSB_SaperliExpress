// src/types/express.d.ts (ou dans un dossier approprié dans ton projet)

import { Request } from 'express';


export interface AuthenticatedRequest extends Request {
    auth?: { visiteurId: string };
}