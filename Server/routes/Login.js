// Importing the module 
const express=require("express") 
const router=express.Router() 
const config = require('./Configuration/DB_Connection_SearchOne_Config.js');
const { json } = require("body-parser");
  
// Handling login request 
router.get("/",(req,res,next)=>{ 

console.log(`fire login-server`);
let value = config.searchQuery({ title: 'Back to the Future' })
console.log(value)
res.send("This is the login request") 
}) 
module.exports=router