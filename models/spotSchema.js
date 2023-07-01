import mongoose, { Schema } from "mongoose";

const spotSchema = new Schema({
    spot_lat: { type: 'string', required: true },
    spot_long: { type: 'string', required: true },
    image_url: { type: 'string', required: true },
    category: { type: 'string' },
    isValid: { type: 'boolean', default: false },
    isReviewed: { type: 'boolean', default: false }
})

const Spot = mongoose.model("Spot", spotSchema);

export default Spot;