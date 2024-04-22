const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express=require("express") 
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/Signup", async function async (req, res) {
  const results = await addValues(req);
  res.send(JSON.stringify(results)).status(200);
  });

 async function addValues(req){
        try {
          const users = database.collection('User_Info');
          const docs = [
            {email: req.body.email, password: req.body.password, fullname: req.body.fullname, address: req.body.address,userType:2}
          ];
           const updatedValues = await users.insertMany(docs);
           // display the results of your operation
           console.log(updatedValues.insertedIds[0]);       
           
           
           return updatedValues.insertedIds[0];
        }
         finally {
          //await client.close();
        }
      
}

module.exports = app;