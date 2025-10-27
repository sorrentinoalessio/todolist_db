import { getActivityById } from '../services/activityService.js';

export const get = async (req, res) => {
    const activityId = parseInt(req.params.id);
    const activity = await getActivityById(activityId);
    if(activity) {
        res.status(200).json(activity);
    } 
    else {
        res.status(404).json({message: `error: activity ${activityId} not found`});
    }
}