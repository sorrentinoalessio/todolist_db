import Joi from 'joi';  //importiamo la libreria Joi
import expressJoi from 'express-joi-validation';  //importiamo il modulo express Joi
const createValidator = expressJoi.createValidator;  //estraggo la funzione createValidator dall'oggetto expressJoi
const validator = createValidator({ passError: true});  //inizializzo il validator impostando passError: true per passare la gestione degli errori a un middleware centrale

const bodyValidator = Joi.object({
    name: Joi.string().required().min(3).max(256),   //imposto requisiti per il body
    description: Joi.string().required().min(3)
})

const idParamValidator = Joi.object({
    id: Joi.number().required().integer().positive()   //imposto requisiti per l'id
})

export const activityBodyValidator = validator.body(bodyValidator);  //creo il middleware di validazione per il body
export const activityIdParamValidator = validator.params(idParamValidator);  //creo il middleware di validazione per l'id

