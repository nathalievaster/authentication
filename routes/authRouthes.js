const express = require("express");
const router = express.Router();

// Add a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validation - vidare utveckla senare
    if (!username || !password) {
        return res.status(400).json({ error: "You must fill in your username/password."});
    }

    // Correct inut
    res.status(201).json({ message: "User created"});
  } catch (error) {
    res.status(500).json({ error: "Server error"});
  }
});

// Login user
router.post("/login", async(req, res) => {
    try {
     const { username, password } = req.body;
    // Validation - vidare utveckla senare
    if (!username || !password) {
        return res.status(400).json({ error: "You must fill in your username/password."});
    }
   // Hårdkodat
   if(username === "Nathalie" && password === "hej") {
    res.status(200).json({message: "Login successful"});
   } else {
    res.status(401).json({message: "Incorrect username/password"});
   }

    } catch(error) {
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;
