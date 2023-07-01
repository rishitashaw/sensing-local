import mongoose, { Schema } from "mongoose";

const roadSchema = new Schema({
    name: { type: "string", required: true },
    isAudited: { type: "boolean", default: false },
    start_lat: { type: "string", required: true },
    start_long: { type: "string", required: true },
    end_lat: { type: "string", required: true },
    end_long: { type: "string", required: true },
})

const Road = mongoose.model("Road", roadSchema);

export default Road;