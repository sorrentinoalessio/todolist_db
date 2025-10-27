import { updateActivityById } from '../services/activityService.js';

export const remove = async (req, res) => {
    const activityId = parseInt(req.params.id);
    const result = await updateActivityById(activityId, {status: 'deleted'});
    return !result ? res.status(500).json({message: `Error deleting ${activityId}`}) : res.status(200).json();
}