/*global require, __dirname, process*/
/*eslint no-undef: "error"*/
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:3000`);