
const Joi = require('joi');  //importiamo la libreria Joi
const expressJoi = require('express-joi-validation');  //importiamo il modulo express Joi
const createValidator = expressJoi.createValidator;  //estraggo la funzione createValidator dall'oggetto expressJoi
const validator = createValidator({ passError: true});  //inizializzo il validator impostando passError: true per passare la gestione degli errori a un middleware centrale

const bodyValidator = Joi.object({
    name: Joi.string().required().min(3).max(256),   //imposto requisiti per il body
    description: Joi.string().required().min(3)
})

const paramsValidator = Joi.object({
    id: Joi.number().required().integer().positive()   //imposto requisiti per l'id
})

const activityBodyValidator = validator.body(bodyValidator);  //creo il middleware di validazione per il body
const activityParamsValidator = validator.params(paramsValidator);  //creo il middleware di validazione per l'id

module.exports = [activityBodyValidator, activityParamsValidator];  //permetto di esportarlo in altri file ma dentro un array in modo da concatenarci altri validator.

/*
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({passError: true});
module.exports = [
    validator.body(Joi.object().keys({
        name: Joi.string().required().min(3).max(256),
        description: Joi.string().required().min(3)
    }))
]
*/


/*
app.use((err, req, res, next) => {
    if (err?.error && err.error.isJoi) {
        if (err.error.details.some(d => d.path.includes('body'))) {
            return res.status(400).json({
                type: err.type,
                message: "Invalid body: " + err.error.toString()
            });
        }
        if (err.error.details.some(d => d.path.includes('params'))) {
            return res.status(400).json({
                type: err.type,
                message: "Invalid parameter: " + err.error.toString()
            });
        }
    }
    next(err);
});
*/
