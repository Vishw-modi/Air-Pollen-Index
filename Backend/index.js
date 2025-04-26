import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 5000;
const AMBEE_API_KEY = process.env.API_KEY;
app.use(cors());

app.get("/api/pollen", async (req, res) => {
  // Endpoint to fetch Pollen data
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
    const response = await axios.get(
      `https://api.ambeedata.com/latest/pollen/by-place?place=${city}`,
      {
        headers: {
          "x-api-key": AMBEE_API_KEY,
          "Content-type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(
      "Error fetching pollen Data",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch Pollen data" });
  }
});

app.get("/api/aqi", async (req, res) => {
  // Endpoint to fetch AQI data
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  try {
    const response = await axios.get(
      `https://api.ambeedata.com/latest/by-city?city=${city}`,
      {
        headers: {
          "x-api-key": AMBEE_API_KEY,
          "Content-type": "application/json",
        },
      }
    );
    res.json(response.data); // Send the AQI data
  } catch (error) {
    console.error("Error fetching AQI:", error.message);
    res.status(500).json({ error: "Failed to fetch AQI data" });
  }
});

async function latlong(city) {
  try {
    if (!city) {
      throw new Error("City is required");
    }
    const response = await axios.get(
      `https://api.ambeedata.com/geocode/by-place?place=${city}`,
      {
        headers: {
          "x-api-key": AMBEE_API_KEY,
          "Content-type": "application/json",
        },
      }
    );
    const locationData = response.data.data;
    if (!locationData || locationData.length === 0) {
      throw new Error("Location not found");
    }

    const lat = locationData[0].lat;
    const lng = locationData[0].lng;

    return { lat, lng };
  } catch (error) {
    console.log("Error fetching weather Data", error.message);
    throw new Error("Failed to fetch weather data");
  }
}

app.get("/api/weather", async (req, res) => {
  // Endpoint to fetch weather data

  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const { lat, lng } = await latlong(city);

    const response = await axios.get(
      ` https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${lat}&lng=${lng}`,
      {
        headers: {
          "x-api-key": AMBEE_API_KEY,
          "Content-type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("Error fetching weather Data", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
