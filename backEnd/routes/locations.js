// locations.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
// GET all locations
router.get("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const locations = await db.collection("Locations").find().toArray();
        res.json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// POST new location
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newLocation = req.body;
    try {
        const lastItem = await db.collection("Locations").find()
            .sort({idLocation: -1})
            .limit(1)
            .next();


        newLocation.dateFinLocation = parseInt(newLocation.dateFinLocation.split("-").join(""))
        newLocation.dateDebutLocation = parseInt(newLocation.dateDebutLocation.split("-").join(""))
        newLocation.idLocation = lastItem.idLocation + 1
        if (newLocation.avis === undefined) newLocation.avis = 0.0

        const isFound = await db.collection("Locations").find({
            "idBien": newLocation.idBien,
            "$or": [
                {
                    "dateDebutLocation": {"$lte": newLocation.dateFinLocation},
                    "dateFinLocation": {"$gte": newLocation.dateDebutLocation}
                },
                {
                    "dateDebutLocation": {"$lte": newLocation.dateFinLocation},
                    "dateFinLocation": {"$gte": newLocation.dateDebutLocation}
                }
            ]
        }).toArray()
        if (isFound.length === 0) {
            const result = await db.collection("Locations").insertOne(newLocation)
            res.status(200).json("added successfully");
        } else {
            res.status(404).json({error: "Already exists"})

        }
    } catch (error) {
        console.error("Error creating new location:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


router.get('/:email', async (req, res) => {
    const db = req.app.locals.db;
    try {
        const email = req.params.email;

        const locations = await db.collection('Locations')
            .aggregate([
                {
                    "$match": {
                        "mailLoueur": email  // Specify the email address
                    }
                },
                {
                    "$lookup": {
                        "from": "Biens",
                        "localField": "idBien",
                        "foreignField": "idBien",
                        "as": "bien"
                    }
                },
                {
                    "$unwind": "$bien"
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "idLocation": {"$first": "$idLocation"},
                        "idBien": {"$first": "$idBien"},
                        "mailLoueur": {"$first": "$mailLoueur"},
                        "dateDebutLocation": {"$first": "$dateDebutLocation"},
                        "dateFinLocation": {"$first": "$dateFinLocation"},
                        "avis": {"$first": "$avis"},
                        "bien": {"$first": "$bien"}
                    }
                }
            ]).toArray();
        res.json(locations);
    } catch (error) {
        console.error('Error retrieving locations:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/update-avis', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const {idLocation, avis} = req.body;

        console.log(idLocation, avis)
        const result = await db.collection('Locations').updateOne(
            {idLocation: idLocation},
            {$set: {avis: avis}}
        );


        res.json({success: true, message: 'Avis updated successfully.'});

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'An error occurred while updating avis.'});
    }
});


module.exports = router;
