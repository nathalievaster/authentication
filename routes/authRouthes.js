const express = require("express");
const router = express.Router();

// Add a new user
router.post("/register", async (req, res) => {
    console.log("Register called...");
});

// Login user
router.post("/login", async(req, res) => {
    console.log("Login called...")
});

module.exports = router;
