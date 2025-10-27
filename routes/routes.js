import express from 'express';

const router = express.Router();  //Crea un "router" Express per gestire l'insieme di route senza lavorare nell'app principale

//Importo i middleware di validazione del body/id dal file routeValidator.js | Uso destructuring per importare direttamente le due proprietà in modo compatto
import { activityBodyValidator, activityIdParamValidator } from '../validators/routeValidator.js';

import { add } from '../controllers/addActivityController.js';
import { get } from '../controllers/getActivityController.js';
import { update } from '../controllers/updateActivityController.js';
import { remove } from '../controllers/deleteActivityController.js';

router.post('/', activityBodyValidator, add);
router.get('/:id', activityIdParamValidator, get);
router.patch('/:id', activityBodyValidator, activityIdParamValidator, update);
router.delete('/:id', activityIdParamValidator, remove);

export const activityRoutes = router;