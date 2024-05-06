const express = require('express');
const router = express.Router();

// // GET all biens
// router.get("/", async (req, res) => {
//     const db = req.app.locals.db;
//     try {
//         const biens = await db.collection("Biens").find().toArray();
//         res.json(biens);
//     } catch (error) {
//         console.error("Error fetching biens:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// GET all biens with pagination
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Récupère le numéro de page depuis la requête ou utilise 0 par défaut
    const perPage = parseInt(req.query.perPage) || 10; // Récupère le nombre d'éléments par page depuis la requête ou utilise 10 par défaut

    const db = req.app.locals.db;


    try {

        const biens = await db.collection('Biens').aggregate([
            {
                $lookup: {
                    from: "Locations",
                    localField: "idBien",
                    foreignField: "idBien",
                    as: "rentals"
                }
            },
            {
                $unwind: {path: "$rentals", preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: "$_id",
                    idBien: {$first: "$idBien"},
                    commune: {$first: "$commune"},
                    rue: {$first: "$rue"},
                    cp: {$first: "$cp"},
                    nbCouchages: {$first: "$nbCouchages"},
                    nbChambres: {$first: "$nbChambres"},
                    distance: {$first: "$distance"},
                    prix: {$first: "$prix"},
                    mail: {$first: "$mail"},
                    image: {$first: "$image"},
                    averageAvis: {$avg: "$rentals.avis"} // calculate average avis
                }
            },
            {
                $project: {
                    _id: 0,
                    idBien: 1,
                    commune: 1,
                    rue: 1,
                    cp: 1,
                    nbCouchages: 1,
                    nbChambres: 1,
                    distance: 1,
                    prix: 1,
                    mail: 1,
                    image: 1,
                    averageAvis: {$ifNull: ["$averageAvis", 0]} // handle null average avis values
                }
            }
        ]).toArray();

        const start = page * perPage;
        const end = start + perPage;

        // Sélectionne les biens à retourner pour la page actuelle
        const result = biens.slice(start, end);

        // Retourne les biens paginés ainsi que les informations de pagination
        res.status(200).json({
            items: result,
            total: biens.length,
            page,
            perPage,
            totalPages: Math.ceil(biens.length / perPage),
        });
    } catch (error) {
        // Gère les erreurs lors de la récupération des biens depuis la base de données
        console.error("Error fetching biens:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


// GET a specific bien by id
router.get("/:id", async (req, res) => {
        const db = req.app.locals.db;
        const idBien = parseInt(req.params.id);
        try {

            const averageAvis = await db.collection("Locations").aggregate([
                {$group: {_id: "$idBien", averageAvis: {$avg: "$avis"}}},
                {$match: {_id: parseInt(idBien)}}
            ]).toArray();


            const bien = await db.collection("Biens").findOne({idBien: idBien});

            if (!bien) {
                res.status(404).json({error: "Bien not found"});
                return;
            }
            if (bien) {
                const output = {
                    idBien: bien.idBien,
                    commune: bien.commune,
                    rue: bien.rue,
                    cp: bien.cp,
                    nbCouchages: bien.nbCouchages,
                    nbChambres: bien.nbChambres,
                    distance: bien.distance,
                    prix: bien.prix,
                    mail: bien.mail,
                    image: bien.image,
                    lat: bien.lat,
                    lng: bien.lng,
                    averageAvis: averageAvis.length > 0 ? averageAvis[0].averageAvis : 0
                };
                res.json(output);
            }
        } catch
            (error) {
            console.error("Error fetching bien:", error);
            res.status(500).json({error: "Internal server error"});
        }
    }
)
;


// POST new bien
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newBien = req.body;
    try {
        const result = await db.collection("Biens").insertOne(newBien);
        res.json(newBien); // Return the newly created bien directly
    } catch (error) {
        console.error("Error creating new bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// PUT update a specific bien by id
router.put("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    const updatedBien = req.body;
    try {
        const result = await db.collection("Biens").replaceOne({idBien: bienId}, updatedBien);
        res.json(result);
    } catch (error) {
        console.error("Error updating bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// DELETE a specific bien by id
router.delete("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    try {
        const result = await db.collection("Biens").deleteOne({idBien: bienId});
        res.json(result);
    } catch (error) {
        console.error("Error deleting bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.post("/search", async (req, res) => {

    console.log("\naccès controller bien via /\n");
    const db = req.app.locals.db;
    console.log(req.query.page)
    const page = parseInt(req.query.page) || 0;
    const perPage = parseInt(req.query.perPage) || 10;
    let {
        dateDebutLocation,
        dateFinLocation,
        commune,
        prixMax,
        nbChambresMin,
        nbCouchagesMin,
        distanceMaxCentreVille
    } = req.body;

    try {
        const start = page * perPage;
        const end = start + perPage;
        let result = "";
        let biens = "";
        if (dateFinLocation !== undefined && dateDebutLocation !== undefined) {
            dateFin = parseInt(dateFinLocation.split("-").join(""))
            dateDebut = parseInt(dateDebutLocation.split("-").join(""))
            const excludedIds = await db.collection("Biens").aggregate([
                {
                    $lookup: {
                        from: "Locations", // Assuming the name of your Locations collection is "locations" in lowercase
                        localField: "idBien",
                        foreignField: "idBien",
                        as: "rentals"
                    }
                },
                {
                    $match: {
                        "commune": new RegExp(commune, 'i'),
                        "prix": {$lte: prixMax},
                        nbChambres: {$gte: nbChambresMin},
                        nbCouchages: {$gte: nbCouchagesMin},
                        distance: {$gte: distanceMaxCentreVille},
                        "rentals.dateFin": {$gte: dateDebut},
                        "rentals.dateDébut": {$lte: dateFin}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        idBien: 1,
                    }
                }
            ]).toArray()
            biens = await db.collection("Biens").find({idLocation: {$nin: excludedIds}}).toArray();
        } else {
            const filter = {
                commune: new RegExp(commune, 'i') || {$exists: true}, // Filter by commune if provided
                prix: {$lte: prixMax || Infinity}, // Filter by max price
                nbChambres: {$gte: nbChambresMin || 0}, // Filter by minimum number of bedrooms
                nbCouchages: {$gte: nbCouchagesMin || 0}, // Filter by minimum number of sleeping accommodations
                distance: {$lte: distanceMaxCentreVille || Infinity} // Filter by max distance to city center
            };
            biens = await db.collection("Biens").find(filter).toArray();
        }
        result = biens.slice(start, end);
        res.status(200).json({
            items: result,
            total: biens.length,
            page,
            perPage,
            totalPages: Math.ceil(biens.length / perPage),
        });

    } catch (error) {
        // Gère les erreurs lors de la récupération des biens depuis la base de données
        console.error("Error fetching biens:", error);
        res.status(500).json({error: "Internal server error"});
    }

});
// PUT update a specific bien by id
router.put("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    const updatedBien = req.body;
    try {
        const result = await db.collection("Biens").replaceOne({idBien: bienId}, updatedBien);
        res.json(result);
    } catch (error) {
        console.error("Error updating bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


// DELETE a specific bien by id
router.delete("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    try {
        const result = await db.collection("Biens").deleteOne({idBien: bienId});
        res.json(result);
    } catch (error) {
        console.error("Error deleting bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


// POST new bien
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newBien = req.body;
    try {
        const result = await db.collection("Biens").insertOne(newBien);
        res.json(result.ops[0]);
    } catch (error) {
        console.error("Error creating new bien:", error);
        res.status(500).json({error: "Internal server error"});
    }
});
module.exports = router;