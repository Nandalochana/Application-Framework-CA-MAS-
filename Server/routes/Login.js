const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express=require("express") 
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/Login", async function async (req, res) {
  const results = await searchQuery(req);
  res.send(JSON.stringify(results)).status(200);
  });

 async function searchQuery(req){
        try {
          const users = database.collection('User_Info');
           let results = await users.find().toArray();
           for(var item of results) {
            //console.log(req.query.email + ""+ req.query.password);
            if(item.email.toLowerCase()  === req.query.email.toLowerCase()  && item.password.toLowerCase()  ===req.query.password.toLowerCase() ){
              console.log('User Found : ', [item._id]);
              return item;
            }
            else{
              console.log(item.email + ""+ item.password);
              //console.log('Not Matching : ', [item._id]);
            }
         }
         return "No values Found";
        }
         finally {
          //await client.close();
        }
      
}

module.exports = app;