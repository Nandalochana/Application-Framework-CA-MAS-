var express=require("express") 

var app = express()

app.use(express.json())

// Importing all the routes 
const loginroute=require("./routes/Login")
const signuproute=require("./routes/Signup_Route") 
  
// Handling routes request 
app.use("/login",loginroute) 
app.use("/Signup", signuproute); 
//Creates our express server
const port = 3000;
app.set('port', port);


module.exports = app;