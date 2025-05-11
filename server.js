// Importer of packages
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRouthes = require("./routes/authRouthes");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", authRouthes);

// Protected routes 
app.get("/api/secret", authenticateToken, (req, res) => {
    res.json ({ message: "Skyddad route!"});
})

// Validate token 
function authenticateToken(req, res, next) { 
    const authHeader = req.headers ['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) res.status(401).json ({ message: "You have no access to this route, missing token!"});
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({ message: "Unvalid JWT"});

        req.user = user;
        next();
    });
}

// Starting upp the application
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});