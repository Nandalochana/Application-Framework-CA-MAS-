
const express=require("express") 
  
// Importing all the routes 
const loginroute=require("../Server/routes/Login") 
  
// Creating express server 
const app=express() 
  
// Handling routes request 
app.use("/login",loginroute) 
//Creates our express server
const port = 3000;
app.get('/', (req, res) => res.send('Hello World !'));
app.set('port', port);


module.exports = app;