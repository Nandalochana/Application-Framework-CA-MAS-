const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express=require("express") 
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/Login", async function async (req, res) {
  const results = await searchQuery(req);
  res.send(JSON.stringify(results)).status(200);
  });

 async function searchQuery(req){
        try {
          const movies = database.collection('User_Info');
           let results = await movies.find().toArray();
           for(var item of results) {
            if(item.email == req.body.email && item.password ==req.body.password){
              console.log('if : ', [item._id]);
              return item;
            }
            else{
              console.log('else : ', [item._id]);
            }
         }
         return "No values Found";
        }
         finally {
          //await client.close();
        }
      
}

module.exports = app;