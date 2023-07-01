import asyncHandler from "express-async-handler";
import Road from "../models/roadSchema.js";

const regExp = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;

const reg = (value) => {
    return true;
    // return regExp.test(value);
}

const createRoad = asyncHandler(async (req, res) => {
    const { name, start_lat, start_long, end_lat, end_long } = req.body;

    const road = await Road.findOne({ name });

    if (road) {
        return res.status(400).json({ error: "Road already exists" });
    }

    if (!reg(start_lat) || !reg(end_lat) || !reg(end_long) || !reg(start_long)) {
        return res.status(400).json({ error: "Wrong location" });
    }

    const newRoad = await Road.create({
        name,
        start_lat,
        start_long,
        end_lat,
        end_long
    });

    if (newRoad) {
        return res.status(201).json({
            _id: newRoad._id,
            name: newRoad.name,
            start_lat: newRoad.start_lat,
            start_long: newRoad.start_long,
            end_lat: newRoad.end_lat,
            end_long: newRoad.end_long,
            isAudited: newRoad.isAudited
        });
    } else {
        return res.status(500).json({ error: "Unable to create" })
    }
});

const getAllRoads = asyncHandler(async (req, res) => {
    const roads = await Road.find({});
    res.json(roads);
});

const getRoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const road = await Road.findById(id);

    if (road) {
        return res.status(200).json({
            _id: road._id,
            name: road.name,
            start_lat: road.start_lat,
            start_long: road.start_long,
            end_lat: road.end_lat,
            end_long: road.end_long,
            isAudited: road.isAudited
        });
    } else return res.status(500).json({ error: "Couldn't find road" });
});

const updateRoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, start_lat, start_long, end_lat, end_long } = req.body;
    const road = await Road.findById(id);

    if (!road) {
        return res.status(404).json({ error: "Road not found" });
    }

    if (!reg(start_lat) || !reg(end_lat) || !reg(end_long) || !reg(start_long)) {
        return res.status(400).json({ error: "Wrong location" });
    }

    const updatedRoad = await Road.findByIdAndUpdate(
        id,
        {
            name,
            start_lat,
            start_long,
            end_lat,
            end_long
        },
        { new: true }
    );

    if (!updatedRoad) {
        return res.status(404).json({ error: "Road failed to update" });
    }

    res.status(200).json({
        _id: updatedRoad._id,
        name: updatedRoad.name,
        start_lat: updatedRoad.start_lat,
        start_long: updatedRoad.start_long,
        end_lat: updatedRoad.end_lat,
    });
});

const deleteRoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const road = await Road.findByIdAndDelete(id);

    if (!road) {
        return res.status(404).json({ error: "Road not found" });
    }

    res.json({ message: "Road removed" });
});

const auditRoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const road = await Road.findById(id);

    if (!road) {
        return res.status(404).json({ error: "Road not found" });
    }

    const updatedRoad = await Road.findByIdAndUpdate(id, { isAudited: true });
    if (updateRoad) {
        return res.status(200).json({
            _id: updatedRoad._id,
            name: updatedRoad.name,
            start_lat: updatedRoad.start_lat,
            start_long: updatedRoad.start_long,
            end_lat: updatedRoad.end_lat,
        });
    } else {
        return res.status(500).json({ error: "Unable to update the audit status" });
    }
});



export {
    getAllRoads,
    getRoad,
    updateRoad,
    deleteRoad,
    auditRoad,
    createRoad,
};
