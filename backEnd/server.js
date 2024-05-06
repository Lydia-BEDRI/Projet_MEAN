const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");



// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/MEAN", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection succeeded.");
  })
  .catch((err) => {
    console.log("Error in DB connection : " + JSON.stringify(err, undefined, 2));
  });

// Création du schéma pour la collection "Biens"
const bienSchema = new mongoose.Schema({
  idBien: { type: Number, required: true, unique: true },
  commune: { type: String, required: true },
  rue: { type: String, required: true },
  cp: { type: String, required: true },
  nbCouchages: { type: Number, required: true },
  nbChambres: { type: Number, required: true },
  distance: { type: Number, required: true },
  prix: { type: Number, required: true },
  mail: { type: String, required: true, unique: true }
});

// Création du modèle pour la collection "Biens"
const Bien = mongoose.model('Biens', bienSchema);

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Route pour récupérer tous les biens
app.get("/biens", async (req, res) => {
  try {
    const biens = await db;
    res.json(biens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Port d'écoute du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
