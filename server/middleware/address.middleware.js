const axios = require("axios");
const apiKey = process.env.GEOCODING_API_KEY;

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: apiKey,
        },
      }
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return [lng, lat];
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    throw new Error("Error geocoding address: " + error.message);
  }
};

const createCoordinatesFromAddress = async (req, res, next) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const coordinates = await geocodeAddress(address);
    console.log(coordinates);
    req.body.coordinates = coordinates;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createCoordinatesFromAddress;
