const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  idLocation: { type: String, required: true }, // Clé étrangère vers la collection Locations
  idBien: { type: String, ref: 'Biens', required: true ,unique: true }, // Clé étrangère vers la collection Biens
  mailLoueur: { type: String, ref: 'Utilisateurs', required: true, unique: true  }, // Clé étrangère vers la collection Utilisateurs
  dateDebut: { type: String, required: true }, // Date de début de location au format AAAAMMJJ
  dateFin: { type: String, required: true }, // Date de fin de location au format AAAAMMJJ
  avis: { type: String } // L'avis peut être facultatif
});

const Location = mongoose.model('Locations', locationSchema);

module.exports = Location;
