import Joi from 'joi';
import expressJoi from 'express-joi-validation';
import { isObjectIdOrHexString } from 'mongoose';

const createValidator = expressJoi.createValidator;
const validator = createValidator({ passError: true});

const bodyValidator = Joi.object({
    name: Joi.string().required().min(3).max(256),
    description: Joi.string().required().min(3)
})

const idParamValidator = Joi.object({
    id: Joi.string().required()
})

export const activityBodyValidator = validator.body(bodyValidator);
export const activityIdParamValidator = validator.params(idParamValidator);

