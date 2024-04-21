const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.put("/MovieUpdate", async function async(req, res) {
    const results = await addValues(req);
    res.send(JSON.stringify(results)).status(200);
});

async function addValues(req) {
    try {
        const movies = database.collection('Movies');
        console.log(req.body);
        const updatedValues = await movies.updateOne({_id: new ObjectId(req.body.myId)}, { $set: {movieName: req.body.movieName, date: req.body.date, time: req.body.time, location: req.body.location, maxcount: req.body.maxcount,price: req.body.price,img: req.body.img}}) 
        // display the results of your operation
        console.log(updatedValues);
        let results = await movies.find().toArray();
        return results;
    }
    catch (errr) {
        console.error(errr);

    }
    finally {
        //await client.close();
    }

}

module.exports = app;