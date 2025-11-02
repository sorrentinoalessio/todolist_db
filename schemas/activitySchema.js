import mongoose from "mongoose";

const activitySchemas = new mongoose.Schema(
    {
        name: String,
        description: String,
        pippo: String,
        status: { type: String, default: 'open'}
    },
    { 
        timestamps: true 
    }
);

export default mongoose.model('activity', activitySchemas);
