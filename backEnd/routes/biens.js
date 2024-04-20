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
    // Récupère tous les biens depuis la base de données
    const biens = await db.collection("Biens").find().toArray();

    // Calcule les données de pagination
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
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET a specific bien by id
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const bienId = parseInt(req.params.id);
  try {
      const bien = await db.collection("Biens").findOne({ idBien: bienId });
      if (!bien) {
          res.status(404).json({ error: "Bien not found" });
          return;
      }
      res.json(bien);
  } catch (error) {
      console.error("Error fetching bien:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// POST new bien
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newBien = req.body;
    try {
        const result = await db.collection("Biens").insertOne(newBien);
        res.json(newBien); // Return the newly created bien directly
    } catch (error) {
        console.error("Error creating new bien:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT update a specific bien by id
router.put("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    const updatedBien = req.body;
    try {
        const result = await db.collection("Biens").replaceOne({ idBien: bienId }, updatedBien);
        res.json(result);
    } catch (error) {
        console.error("Error updating bien:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE a specific bien by id
router.delete("/:id", async (req, res) => {
    const db = req.app.locals.db;
    const bienId = parseInt(req.params.id);
    try {
        const result = await db.collection("Biens").deleteOne({ idBien: bienId });
        res.json(result);
    } catch (error) {
        console.error("Error deleting bien:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/search", async (req, res) => {
  console.log("\naccès controller bien via /\n");
  const db = req.app.locals.db;
  let documents = await getFiltre(db,req.body);
  res.json(documents);
});

async function getFiltre(db, criteres){
  let filtres = {};

  if(criteres.dateDebutLocation){
    // Ajouter le filtre pour la date de début de location
    filtres.dateDebutLocation = { $gte: new Date(criteres.dateDebutLocation) };
  }

  if(criteres.dateFinLocation){
    // Ajouter le filtre pour la date de fin de location
    filtres.dateFinLocation = { $lte: new Date(criteres.dateFinLocation) };
  }

  if(criteres.commune){
    // Ajouter le filtre pour la commune
    filtres.commune = criteres.commune;
  }

  if(criteres.prixMax){
    // Ajouter le filtre pour le prix maximum
    filtres.prix = { $lte: criteres.prixMax };
  }

  if(criteres.nbChambresMin){
    // Ajouter le filtre pour le nombre de chambres minimum
    filtres.nbChambres = { $gte: criteres.nbChambresMin };
  }

  if(criteres.nbCouchagesMin){
    // Ajouter le filtre pour le nombre de couchages minimum
    filtres.nbCouchages = { $gte: criteres.nbCouchagesMin };
  }

  if(criteres.distanceMaxCentreVille){
    // Ajouter le filtre pour la distance maximale au centre-ville
    filtres.distance = { $lte: criteres.distanceMaxCentreVille };
  }

  return await db.collection("Biens").find(filtres).toArray();
}
// async function getFiltre(db, criteres, page = 0, perPage = 20) {
//   let filtres = {};

//   if (criteres.dateDebutLocation) {
//     filtres.dateDebutLocation = { $gte: new Date(criteres.dateDebutLocation) };
//   }

//   if (criteres.dateFinLocation) {
//     filtres.dateFinLocation = { $lte: new Date(criteres.dateFinLocation) };
//   }

//   if (criteres.commune) {
//     filtres.commune = criteres.commune;
//   }

//   if (criteres.prixMax) {
//     filtres.prix = { $lte: criteres.prixMax };
//   }

//   if (criteres.nbChambresMin) {
//     filtres.nbChambres = { $gte: criteres.nbChambresMin };
//   }

//   if (criteres.nbCouchagesMin) {
//     filtres.nbCouchages = { $gte: criteres.nbCouchagesMin };
//   }

//   if (criteres.distanceMaxCentreVille) {
//     filtres.distance = { $lte: criteres.distanceMaxCentreVille };
//   }

//   const cursor = db.collection("Biens").find(filtres);
//   const totalItems = await cursor.count();

//   const result = await cursor.skip(page * perPage).limit(perPage).toArray();

//   return {
//     items: result,
//     total: totalItems,
//     page,
//     perPage,
//     totalPages: Math.ceil(totalItems / perPage)
//   };
// }

// router.post("/search", async (req, res) => {
//   const db = req.app.locals.db;
//   const { criteres, page, perPage } = req.body; // Récupère les critères de recherche, page et perPage depuis le corps de la requête

//   try {
//     const documents = await getFiltre(db, criteres, page, perPage);
//     res.json(documents);
//   } catch (error) {
//     console.error("Error fetching biens:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// PUT update a specific bien by id
router.put("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const bienId = parseInt(req.params.id);
  const updatedBien = req.body;
  try {
      const result = await db.collection("Biens").replaceOne({ idBien: bienId }, updatedBien);
      res.json(result);
  } catch (error) {
      console.error("Error updating bien:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// DELETE a specific bien by id
router.delete("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const bienId = parseInt(req.params.id);
  try {
      const result = await db.collection("Biens").deleteOne({ idBien: bienId });
      res.json(result);
  } catch (error) {
      console.error("Error deleting bien:", error);
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;