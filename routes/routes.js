import express from 'express';

const router = express.Router();

import { activityBodyValidator, activityIdParamValidator } from '../validators/routeValidator.js';

import { add } from '../controllers/addActivityController.js';
import { get } from '../controllers/getActivityController.js';
import { update } from '../controllers/updateActivityController.js';
import { remove } from '../controllers/deleteActivityController.js';

router.post('/', activityBodyValidator, add);
router.get('/:id', activityIdParamValidator, get);
router.patch('/:id', activityIdParamValidator, activityBodyValidator, update);
router.delete('/:id', activityIdParamValidator, remove);

export const activityRoutes = router;