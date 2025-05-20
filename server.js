// Importer of packages
const cors = require("cors");
const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);

// Validate token 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "You have no access to this route, missing token!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unvalid JWT" });
        }

        req.user = user;
        next();
    });
}

app.get("/api/secret", authenticateToken, (req, res) => {
    const sql = `SELECT id, username, created FROM users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        res.json({ users: rows });
    });
});

// Starting upp the application
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});