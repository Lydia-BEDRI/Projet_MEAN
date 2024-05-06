const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//importe les different controller
const userRoutes = require('./routes/users');
const bienRoutes = require('./routes/biens');
const locationRoutes = require('./routes/locations');

app.use('/users', userRoutes);
app.use('/biens', bienRoutes);
app.use('/locations', locationRoutes);
app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

//Connection à MongoDB et démarrage du serveur
const client = new MongoClient(url);

client.connect()
    .then(client => {
        const db = client.db("MEAN");
        app.locals.db = db;
        app.listen(8888, () => console.log("Serveur démarré sur le port 8888"));
    })
    .catch(err => {
        console.error("Erreur lors de la connexion à MongoDB:", err);
    });