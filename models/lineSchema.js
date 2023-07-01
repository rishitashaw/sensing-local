import mongoose, { Schema } from "mongoose";

const lineSchema = new Schema({
    start_lat: { type: 'string', required: true },
    start_long: { type: 'string', required: true },
    end_lat: { type: 'string', required: true },
    end_long: { type: 'string', required: true },
    distance: { type: 'string' },
    video_url: { type: 'string', required: true },
    category: { type: 'string' },
    isValid: { type: 'boolean', default: false },
    isReviewed: { type: 'boolean', default: false }
})

const Line = mongoose.model("Line", lineSchema);

export default Line;