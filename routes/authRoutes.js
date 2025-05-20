const express = require("express");
const cors = require("cors");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Connect to database
const db = new sqlite3.Database(process.env.DATABASE);

// Add a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        const errors = [];

        if (!username) {
            errors.push("You must fill in your username.");
        }
        if (!password) {
            errors.push("You must fill in your password.");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Check if user already exists
        const checkSql = `SELECT * FROM users WHERE username = ?`;
        db.get(checkSql, [username], async (err, row) => {
            if (err) {
                return res.status(500).json({ message: "Database error." });
            }

            if (row) {
                return res.status(409).json({ message: "User already exists." });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into DB
            const insertSql = `INSERT INTO users(username, password) VALUES(?, ?)`;
            db.run(insertSql, [username, hashedPassword], (err) => {
                if (err) {
                    return res.status(400).json({ message: "Error creating user..." });
                } else {
                    return res.status(201).json({ message: "User created" });
                }
            });
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validation - vidare utveckla senare
        if (!username || !password) {
            return res.status(400).json({ error: "You must fill in your username/password." });
        }
        // Check if user exists
        const sql = `SELECT * FROM users WHERE username =?`;
        db.get(sql, [username], async (err, row) => {
            if (err) {
                res.status(400).json({ message: "Error authenticating..." });
            } else if (!row) {
                res.status(401).json({ message: "Incorrect username/password!" });
            } else {
                // Check password
                const passwordMatch = await bcrypt.compare(password, row.password);

                if (!passwordMatch) {
                    res.status(401).json({ message: "Incorrect username/password!" });
                } else {
                    // Create JWT
                    const payload = { username: username };
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    const response = {
                        message: "User logged in!",
                        token: token
                    }
                    res.status(200).json({ response });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
