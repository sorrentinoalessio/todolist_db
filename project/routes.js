const express = require('express');

const router = express.Router();  //Crea un "router" Express per gestire l'insieme di route senza lavorare nell'app principale

//Importo i middleware di validazione del body/id dal file routeValidator.js | Uso destructuring per importare direttamente le due proprietà in modo compatto
const { activityBodyValidator, activityParamsValidator } = require('./routeValidator.js');

const { add, get, update, remove } = require('./activityService.js');

router.post('/', activityBodyValidator, add);
router.get('/:id', activityParamsValidator, get);
router.patch('/:id', activityBodyValidator, activityParamsValidator, update);
router.delete('/:id', activityParamsValidator, remove);

module.exports = { activityRoutes: router };