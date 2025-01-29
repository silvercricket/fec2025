/*global require, __dirname, process*/
/*eslint no-undef: "error"*/
require("dotenv").config();
const express = require("express");
const path = require("path");
var session = require('express-session')
const app = express();
//app.use(session())
app.use(express.static(path.join(__dirname, './client/dist')));
const PORT = process.env.PORT;
app.listen(3000);
console.log(`Server listening at http://localhost:3000`);