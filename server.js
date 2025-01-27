require("dotenv").config();
const express = require("express");
const path = require("path");
var session = require('express-session')
const app = express();
//app.use(session())
app.use(express.static(path.join(__dirname, './client/dist')));
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);