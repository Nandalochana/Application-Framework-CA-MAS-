const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/MovieAdd", async function async(req, res) {
  const results = await movieAdd(req);
  res.send(JSON.stringify(results)).status(200);
});

async function movieAdd(req) {
  try {
    const movies = database.collection('Movies');
    const docs = [
      { movieName: req.body.movieName, date: req.body.date, time: req.body.time, location: req.body.location, maxcount: req.body.maxcount,price: req.body.price,img: req.body.img,info:req.body.info }
    ];
    const updatedValues = await movies.insertMany(docs);
    // display the results of your operation
    console.log(updatedValues.insertedIds[0]);
    let results = await movies.find().toArray();
    return results;
  }
  finally {
    //await client.close();
  }

}

module.exports = app;