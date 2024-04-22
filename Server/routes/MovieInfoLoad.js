const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
const { ObjectId } = require("mongodb");


var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/MovieInfoLoad", async function async(req, res) {
    const results = await searchQuery(req);
    res.send(JSON.stringify(results)).status(200);
});

async function searchQuery(req) {
    try {
        console.log("test");
        const movies = database.collection('Movies');
        let results = await movies.find().toArray();
        for (var item of results) {
            //console.log(req.query.email + ""+ req.query.password);
            if (item._id.equals(req.query.id)) {
                console.log('Movie Found : ', [item._id]);
                return item;
            }
            else {
                console.log( item.movieName);
                console.log('Not Matching : ', [item._id]);
            }
        }
        return "No values Found";
    }
    finally {
        //await client.close();
    }

}

module.exports = app;