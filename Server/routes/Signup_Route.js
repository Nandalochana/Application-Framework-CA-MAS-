const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const { ObjectId } = require("mongodb");
const database = client.db('moviebooking');
var express=require("express") 
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/Signup", async function async (req, res) {
  const results = await signUp(req);
  res.send(JSON.stringify(results)).status(200);
  });

 async function signUp(req){
        try {
          const users = database.collection('User_Info');
          const docs = [
            {email: req.body.email, password: req.body.password, fullname: req.body.fullname, address: req.body.address,userType:2}
          ];
           const updatedValues = await users.insertMany(docs);
           // display the results of your operation
           let results = await users.find().toArray();
           for(var item of results) {
            //console.log(req.query.email + ""+ req.query.password);
            if(item.email.toLowerCase()  === req.body.email.toLowerCase()  && item.password.toLowerCase()  ===req.body.password.toLowerCase() ){
              console.log('User Found : ', [item._id]);
              return item;
            }
            else{
              console.log(item.email + ""+ item.password);
              //console.log('Not Matching : ', [item._id]);
            }
         }  
           return "Invalid Info";
        }
         finally {
          //await client.close();
        }
      
}

module.exports = app;