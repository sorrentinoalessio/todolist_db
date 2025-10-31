import express from 'express';

const router = express.Router(); // Crea un oggetto router utilizzando Express.js
// Importa i middleware di validazione per il corpo della richiesta e i parametri dell'ID
import { activityBodyValidator, activityIdParamValidator } from '../validators/routeValidator.js';
// Importa i controller per gestire le operazioni CRUD sulle attività
import { add } from '../controllers/addActivityController.js'; // Controller per aggiungere una nuova attività
import { get } from '../controllers/getActivityController.js';
import { update } from '../controllers/updateActivityController.js';
import { remove } from '../controllers/deleteActivityController.js';

router.post('/', activityBodyValidator, add); // Definisce una rotta POST per aggiungere una nuova attività
router.get('/:id', activityIdParamValidator, get);// Definisce una rotta GET per ottenere un'attività specifica in base all'ID
router.patch('/:id', activityIdParamValidator, activityBodyValidator, update);// Definisce una rotta PATCH per aggiornare un'attività specifica in base all'ID
router.delete('/:id', activityIdParamValidator, remove);// Definisce una rotta DELETE per rimuovere un'attività specifica in base all'ID

export const activityRoutes = router; // Esporta l'oggetto router per essere utilizzato in altre parti dell'applicazione