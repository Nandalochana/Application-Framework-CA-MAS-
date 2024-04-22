const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/UserAdd", async function async(req, res) {
  const results = await userAdd(req);
  res.send(JSON.stringify(results)).status(200);
});

async function userAdd(req) {
  try {
    const user = database.collection('User_Info');
    const docs = [
      { fullName: req.body.fullName, email: req.body.email, password: req.body.password, address: req.body.address, userType: req.body.userType }
    ];
    const updatedValues = await user.insertMany(docs);
    // display the results of your operation
    console.log(updatedValues.insertedIds[0]);
    let results = await user.find().toArray();
    return results;
  }
  finally {
    //await client.close();
  }

}

module.exports = app;