var express = require("express")
var app = express()
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing all the routes 
const loginroute = require("./routes/Login")
const signuproute = require("./routes/Signup_Route")
const movieAdd = require("./routes/MovieAdd")
const movieLoad = require("./routes/MovieLoad")
const movieDelete = require("./routes/MovieDelete")
const movieUpdate = require("./routes/MovieUpdate")
const MovieFilter = require("./routes/MovieFilter")
const UserAdd = require("./routes/UserAdd")
const UserLoad = require("./routes/UserLoad")
const UserDelete = require("./routes/UserDelete")
const UserUpdate = require("./routes/UserUpdate")
const MovieInfoLoad = require("./routes/MovieInfoLoad")

// Handling routes request 
// Add a new document to the collection

// Load the /posts routes
app.get("/Login", loginroute);
app.post("/Signup", signuproute);
app.post("/MovieAdd", movieAdd);
app.post("/MovieLoad", movieLoad);
app.delete("/MovieDelete", movieDelete);
app.put("/MovieUpdate", movieUpdate);
app.post("/MovieFilter", MovieFilter);
app.post("/UserAdd", UserAdd);
app.post("/UserLoad", UserLoad);
app.delete("/UserDelete", UserDelete);
app.put("/UserUpdate", UserUpdate);
app.get("/MovieInfoLoad", MovieInfoLoad);


//Creates our express server
const port = 3000;
app.set('port', port);


module.exports = app;