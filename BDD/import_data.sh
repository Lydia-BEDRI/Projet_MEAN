#!/bin/bash

mongoimport --db MEAN --collection Utilisateurs --file Users.json --jsonArray --drop
mongoimport --db MEAN --collection Biens --file Biens.json --jsonArray --drop
mongoimport --db MEAN --collection Locations --file Locations.json --jsonArray --drop

