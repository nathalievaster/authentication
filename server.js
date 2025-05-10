// Importerar nödvändiga paket
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


// Startar applikationen
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});