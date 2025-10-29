
import activitySchema from "../schemas/activitySchema.js";

class ActivityRepository {
    async add(content) {
        const res = await activitySchema.create(content).catch((err) => {
            console.log(err);
        });
        return res.toObject();
    }

    async getById(id) {
        const res = await activitySchema.findById(id).catch((err) => {
            console.log(err);
        });
        return res.toObject();
    }

    async update(id, params) {
        console.log(id, params);
        const res = await activitySchema.findByIdAndUpdate(id, params, {new: true}).catch((err) => {
            console.log(err);
        });
        return res.toObject();
    }
}


export default new ActivityRepository();