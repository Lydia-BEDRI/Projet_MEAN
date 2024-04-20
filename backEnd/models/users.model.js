const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  mail: { type: String, required: true ,unique: true},
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  telephone: { type: String, required: true }
});

const Utilisateur = mongoose.model('Utilisateurs', utilisateurSchema);

module.exports = Utilisateur;
