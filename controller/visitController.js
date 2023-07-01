import asyncHandler from "express-async-handler";
import Visit from "../models/visitSchema.js";
import Road from "../models/roadSchema.js";

const createVisit = asyncHandler(async (req, res) => {
    const { date_time, road_id } = req.body;
    const road = await Road.findById(road_id)

    if (!road) {
        return res.status(400).json({ error: "Road not found" });
    }

    if (road.isAudited) {
        return res.status(400).json({ error: "Road is already audited" });
    }

    const curr_time = new Date();
    const visit_time = new Date(date_time);

    if (curr_time < visit_time) {
        return res.status(400).json({ error: "Cannot make visits in past" });
    }

    const visit = await Visit.create({
        date_time: date_time,
        start_lat: road.start_lat,
        end_lat: road.end_lat,
        start_long: road.start_long,
        end_long: road.end_long,
    })

    if (visit) {
        res.status(200).json({
            message: "Visit created successfully",
            visit,
        });
    } else {
        res.status(400).json({ error: "Visit not created" });
    }
})

const deleteVisit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await Visit.findById(id);
    if (!visit) {
        return res.status(400).json({ error: "Visit not found" });
    }
    await visit.remove();
    res.status(200).json({ message: "Visit deleted successfully" });
})

const updateVisit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date_time, road_id } = req.body;

    const curr_time = new Date();
    const visit_time = new Date(date_time);

    if (curr_time > visit_time) {
        return res.status(400).json({ error: "Cannot change past Visits" });
    }

    const road = Road.findOne({ _id: road_id })
    if (!road) {
        return res.status(400).json({ error: "Road not found" });
    }
    const visit = await Visit.findById(id);
    if (!visit) {
        return res.status(400).json({ error: "Visit not found" });
    }
    visit.date_time = date_time;
    visit.start_lat = road.start_lat;
    visit.end_lat = road.end_lat;
    visit.start_long = road.start_long;
    visit.end_long = road.end_long;
    await visit.save();
    res.status(200).json({ message: "Visit updated successfully" });
})

const getAllUpcomingVisits = asyncHandler(async (req, res) => {
    const visits = await Visit.find({
        date_time: {
            $gte: new Date(),
        },
    });
    if (visits.length > 0) {
        return res.status(200).json({ visits });
    } else {
        return res.status(400).json({ error: "No visits found" });
    }
})

const getAllPastVisits = asyncHandler(async (req, res) => {
    const visits = await Visit.find({
        date_time: {
            $lte: new Date(),
        },
    });
    if (visits.length > 0) {
        return res.status(200).json({ visits });
    } else {
        return res.status(400).json({ error: "No visits found" });
    }
})

const getVisit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await Visit.findById(id);
    if (visit) {
        return res.status(200).json({
            _id: visit._id,
            date_time: visit.date_time,
            start_lat: visit.start_lat,
            end_lat: visit.end_lat,
            start_long: visit.start_long,
            end_long: visit.end_long,
            roads: visit.roads,
            lines: visit.lines,
            spots: visit.spots
        });
    }
    return res.status(400).json({ error: "Visit not found" });
})

// API endpoint to insert a road into visits based on latitude and longitude conditions
const addRoadsToVisit = asyncHandler(async (req, res) => {
    const { id: visitId } = req.params;

    try {
        const getVisit = await Visit.findById(visitId);
        if (!getVisit) {
            return res.status(404).json({ error: 'Road not found' });
        }

        // Retrieve the road based on the provided latitude and longitude values
        const road = await Road.findOne({
            start_lat: getVisit.start_lat,
            start_long: getVisit.start_long,
            end_lat: getVisit.end_lat,
            end_long: getVisit.end_long
        });

        if (!road) {
            return res.status(404).json({ error: 'Road not found' });
        }

        // Retrieve the visit based on the provided visitId
        const visit = await Visit.findById(visitId);

        if (!visit) {
            return res.status(404).json({ error: 'Visit not found' });
        }

        visit.roads.push(road._id);
        await visit.save();

        return res.json({ message: 'Road added to visit successfully' });
    } catch (error) {
        console.error('Error inserting road into visits:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


export { createVisit, deleteVisit, updateVisit, getAllUpcomingVisits, getAllPastVisits, getVisit, addRoadsToVisit }