import { updateActivityById } from '../services/activityService.js';

export const update = async (req, res) => {
    const activityId = req.params.id;
    const activity = await updateActivityById(activityId, req.body);
    if(activity) {
        res.status(200).json(activity);
    } 
    else {
        res.status(404).json({message: `error: activity ${activityId} not found`});
    }
}