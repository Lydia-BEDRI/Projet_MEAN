// users.js
const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router();
const jwt = require('jsonwebtoken');

// GET all users
router.get("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const users = await db.collection("Utilisateurs").find().toArray();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// GET a specific user by email
router.get("/:email", async (req, res) => {
    const db = req.app.locals.db;
    const userEmail = req.params.email;
    try {
        const user = await db.collection("Utilisateurs").findOne({mail: userEmail});
        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// POST new user
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newUser = req.body;
    try {
        const result = await db.collection("Utilisateurs").insertOne(newUser);
        res.json(newUser); // Return the newly created user directly
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


// PUT update a specific user by email
router.put("/:email", async (req, res) => {
    const db = req.app.locals.db;
    const userEmail = req.params.email;
    const updatedUser = req.body;
    try {
        const result = await db.collection("Utilisateurs").replaceOne({mail: userEmail}, updatedUser);
        res.json(result);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// DELETE a specific user by email
router.delete("/:email", async (req, res) => {
    const db = req.app.locals.db;
    const userEmail = req.params.email;
    try {
        const result = await db.collection("Utilisateurs").deleteOne({mail: userEmail});
        res.json(result);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.post("/login", async (req, res) => {

    // console.log(await bcrypt.hash("12345", 10));


    const db = req.app.locals.db;
    const {email, password} = req.body;

    try {

        const user = await db.collection("Utilisateurs").findOne({mail: email});
        if (!user) {
            return res.status(401).json({error: "Email ou mot de passe incorrect"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({error: 'Authentication failed'});
        }

        const token = jwt.sign({mail: user.mail, prenom: user.prenom, nom: user.nom}, 'lylocbnb', {
            expiresIn: '1h',
        });
        res.status(200).json({token});

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


module.exports = router;
