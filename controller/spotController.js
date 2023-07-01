import asyncHandler from 'express-async-handler';
import Spot from '../models/spotSchema.js';
import Visit from '../models/visitSchema.js';
// API endpoint to create a spot
const createSpot = asyncHandler(async (req, res) => {
    const { spot_lat, spot_long, image_url } = req.body;
    const { id: visitId } = req.params;

    try {
        // Make an API call to fetch the category
        const category = await getCategoryFromExternalAPI(image_url);
        if (!category) {
            return res.status(500).json({ error: 'Failed to fetch category' });
        }

        // Calculate the distance between start and end coordinates
        // const distance = calculateDistance(start_lat, start_long, end_lat, end_long);
        // Create the spot
        const spot = await Spot.create({
            spot_lat,
            spot_long,
            image_url,
            category,
        });

        // Add the spot to the visit
        await addSpotToVisit(visitId, spot._id);

        return res.json({ message: 'Spot created and added to visit successfully', spot });
    } catch (error) {
        console.error('Error creating spot:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to fetch the category from an external API
async function getCategoryFromExternalAPI(image_url) {
    try {
        // Replace with the actual API endpoint for fetching the category
        // const response = await axios.post('https://api.example.com/category', { url: image_url });
        // if (response) return "garbage"; // Adjust the response structure based on the API response
        // else return null;
        const category = "garbage";
        return category;
    } catch (error) {
        console.error('Error fetching category from API:', error.message);
        return null;
    }
}

// Function to calculate the distance between two coordinates using the haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}

// Function to convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to add a spot to a visit
async function addSpotToVisit(visitId, spotId) {
    try {
        const visit = await Visit.findById(visitId);
        if (!visit) {
            throw new Error('Visit not found');
        }

        visit.spots.push(spotId);
        await visit.save();

        console.log('Spot added to visit successfully');
    } catch (error) {
        console.error('Error adding spot to visit:', error.message);
    }
}

export { createSpot }