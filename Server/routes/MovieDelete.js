const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.delete("/MovieDelete", async function async(req, res) {
    const results = await addValues(req);
    res.send(JSON.stringify(results)).status(200);
});

async function addValues(req) {
    try {
        const id = req.query.id;
        const movies = database.collection('Movies');
        await movies.deleteOne({ _id: new ObjectId(id) });
        let myValues = await movies.find().toArray();
        return myValues;
    }
    catch (errr) {
        console.error(errr);

    }
    finally {
        //await client.close();
    }

}

module.exports = app;