const mongoose = require('mongoose');

const bienSchema = new mongoose.Schema({
  idBien: { type: Number, required: true,unique: true },
  commune: { type: String, required: true },
  rue: { type: String, required: true },
  cp: { type: String, required: true },
  nbCouchages: { type: Number, required: true },
  nbChambres: { type: Number, required: true },
  distance: { type: Number, required: true },
  prix: { type: Number, required: true },
  mail: { type: String, required: true, ref: 'Utilisateurs', unique: true } // Référence à la collection Utilisateurs
});

const Bien = mongoose.model('Biens', bienSchema);

module.exports = Bien;
