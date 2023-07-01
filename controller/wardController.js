import asyncHandler from "express-async-handler";
import Ward from "../models/wardSchema.js";
import Road from "../models/roadSchema.js";

const regExp = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;

const reg = (value) => {
    // return regExp.test(value);
    return true;
}

const createWard = asyncHandler(async (req, res) => {
    const { name, lat, long, city, pincode, state } = req.body;

    const ward = await Ward.findOne({ name });

    if (ward) {
        return res.status(400).json({ error: "Ward already exists" });
    }

    if (!reg(lat) || !reg(long)) {
        return res.status(400).json({ error: "Wrong location" });
    }

    const newWard = await Ward.create({
        name,
        city,
        pincode,
        state,
        lat,
        long
    });

    if (newWard) {
        return res.status(201).json({
            _id: newWard._id,
            name: newWard.name,
            city: newWard.city,
            pincode: newWard.pincode,
            state: newWard.state,
            lat: newWard.lat,
            long: newWard.long,
            isAudited: newWard.isAudited,
            roads: newWard.roads,
        });
    }
    res.status(500).json({ error: 'Failed to create' });
});

const getAllWards = asyncHandler(async (req, res) => {
    const wards = await Ward.find();
    res.json(wards);
});

const getWard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ward = await Ward.findById(id);

    if (ward) {
        return res.status(201).json({
            _id: ward._id,
            name: ward.name,
            city: ward.city,
            pincode: ward.pincode,
            state: ward.state,
            lat: ward.lat,
            long: ward.long,
            isAudited: ward.isAudited,
            roads: ward.roads,
        });
    }
    res.status(404).json({ error: "Ward not found" });
});

const updateWard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, lat, long, city, pincode, state } = req.body;
    const ward = await Ward.findById(id);

    if (!ward) {
        return res.status(404).json({ error: "Ward not found" });
    }

    if (!reg(lat) || !reg(long)) {
        return res.status(400).json({ error: "Wrong location" });
    }

    const updatedWard = await Ward.findByIdAndUpdate(
        id,
        {
            name,
            lat,
            long,
            city,
            pincode,
            state
        },
        { new: true }
    );

    if (!updatedWard) {
        return res.status(404).json({ error: "Ward failed to update" });
    }

    return res.status(201).json({
        _id: updatedWard._id,
        name: updatedWard.name,
        city: updatedWard.city,
        pincode: updatedWard.pincode,
        state: updatedWard.state,
        lat: updatedWard.lat,
        long: updatedWard.long,
        isAudited: updatedWard.isAudited,
        roads: updatedWard.roads,
    });
});

const deleteWard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ward = await Ward.findByIdAndDelete(id);

    if (!ward) {
        return res.status(404).json({ error: "Ward not found" });
    }

    return res.status(200).json({ message: "Ward removed" });
});

const auditWard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ward = await Ward.findById(id);

    if (!ward) {
        return res.status(404).json({ error: "Ward not found" });
    }

    const updatedWard = await Ward.findByIdAndUpdate(id, {
        isAudited: true
    });

    return res.status(201).json({
        _id: updatedWard._id,
        name: updatedWard.name,
        city: updatedWard.city,
        pincode: updatedWard.pincode,
        state: updatedWard.state,
        lat: updatedWard.lat,
        long: updatedWard.long,
        isAudited: updatedWard.isAudited,
        roads: updatedWard.roads,
    });
});
// Function to add roads to a ward
const addRoadsToWard = asyncHandler(async (req, res) => {
    const { id: wardId } = req.params;
    const { roadId } = req.body;

    try {
        const ward = await Ward.findById(wardId);
        if (!ward) {
            return res.status(404).json({ error: 'Ward not found' });
        }

        const road = await Road.findById(roadId);
        if (!road) {
            return res.status(404).json({ error: 'Road not found' });
        }

        ward.roads.push(road);
        await ward.save();

        return res.json({ message: 'Road added to ward successfully' });
    } catch (error) {
        console.error('Error adding roads to ward:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
export {
    getAllWards,
    getWard,
    updateWard,
    deleteWard,
    auditWard,
    createWard,
    addRoadsToWard
};
