// Importing the module 
const express=require("express") 
var app = express()
const router=express.Router() 
app.use(express.json())
app.use("/Signup", function (req, res) {
    console.log("test"+req.body);
    res.send('Done');
  }); 

module.exports=router