const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
    {
        // les champs dans la collection
         firstName :String,
         lastName: String,
         emailAddress :String,
         phoneNumber : String,
         dob : String
    }
);

// exporter le model
const customerModel = mongoose.model('Custumers',customerSchema) ;
module.exports = customerModel;