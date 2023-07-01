import mongoose, { Schema } from "mongoose";

const wardSchema = new Schema({
    isAudited: { type: 'boolean', default: false },
    name: { type: 'string', required: true },
    city: { type: 'string', required: true },
    state: { type: 'string' },
    pincode: { type: 'string' },
    lat: { type: 'string', required: true },
    long: { type: 'string', required: true },
    roads: [{ type: Schema.Types.ObjectId, ref: 'Road' }],
}, { timestamps: true })

const Ward = mongoose.model('Ward', wardSchema)

export default Ward