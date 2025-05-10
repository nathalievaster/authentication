// Importerar nödvändiga paket
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouthes = require("./routes/authRouthes");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Routes
app.use("/api", authRouthes);

// Startar applikationen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});