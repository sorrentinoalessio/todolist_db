import Joi from 'joi';
import expressJoi from 'express-joi-validation';
import mongoose from 'mongoose';

const createValidator = expressJoi.createValidator;
const validator = createValidator({ passError: true });//

const bodyValidator = Joi.object({
    name: Joi.string().required().min(3).max(256),
    description: Joi.string().required().min(3),
    pippo: Joi.string().required().min(3).max(256)
})

const idParamValidator = Joi.object({
    id: Joi.string().length(24).hex().required().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
});

export const activityBodyValidator = validator.body(bodyValidator);
export const activityIdParamValidator = validator.params(idParamValidator);

