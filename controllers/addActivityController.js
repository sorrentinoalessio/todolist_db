import { addActivity } from '../services/activityService.js';

export const add = (req, res) => {
    const content = req.body;
    try{
        const activity = addActivity(content);
        res.status(201).json(activity);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}