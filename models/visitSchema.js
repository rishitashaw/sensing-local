import mongoose, { Schema } from "mongoose";

const visitSchema = new Schema({
    date_time: { type: 'string', required: true },
    start_lat: { type: 'string', required: true },
    start_long: { type: 'string', required: true },
    end_lat: { type: 'string', required: true },
    end_long: { type: 'string', required: true },
    roads: [{ type: Schema.Types.ObjectId, ref: 'Road' }],
    lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
    spots: [{ type: Schema.Types.ObjectId, ref: 'Spot' }]
}, { timestamps: true })

const Visit = mongoose.model('Visits', visitSchema)

export default Visit