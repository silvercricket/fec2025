require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);