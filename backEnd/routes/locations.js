// locations.js
const express = require('express');
const router = express.Router();

// GET all locations
router.get("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const locations = await db.collection("Locations").find().toArray();
        res.json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST new location
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newLocation = req.body;
    try {
        const result = await db.collection("Locations").insertOne(newLocation);
        res.json(result.ops[0]);
    } catch (error) {
        console.error("Error creating new location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add other CRUD operations for locations as needed

module.exports = router;
