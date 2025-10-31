import Joi from 'joi'; // Importa la libreria Joi per la validazione dei dati
import expressJoi from 'express-joi-validation'; // Importa il middleware express-joi-validation per integrare Joi con Express
import { isObjectIdOrHexString } from 'mongoose'; // Importa la funzione isObjectIdOrHexString da Mongoose

const createValidator = expressJoi.createValidator; // Crea un'istanza del validatore express-joi-validation
const validator = createValidator({ passError: true}); // Configura il validatore per passare gli errori al middleware di gestione degli errori di Express

const bodyValidator = Joi.object({ // Definisce lo schema di validazione per il corpo della richiesta
    name: Joi.string().required().min(3).max(256), // Il campo 'name' deve essere una stringa obbligatoria con una lunghezza minima di 3 e massima di 256 caratteri
    description: Joi.string().required().min(3)
})

const idParamValidator = Joi.object({ // Definisce lo schema di validazione per i parametri della richiesta
    id: Joi.string().length(24).hex().required()
})

export const activityBodyValidator = validator.body(bodyValidator); // Esporta il validatore per il corpo della richiesta
export const activityIdParamValidator = validator.params(idParamValidator); // Esporta il validatore per i parametri della richiesta

