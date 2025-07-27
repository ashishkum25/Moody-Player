const express  = require('express');
const app = express();

const songRoute = require("./routes/songRoute.js")

const cors = require('cors');
app.use(cors());

app.use(express.json())

app.use('/', songRoute);


module.exports = app;