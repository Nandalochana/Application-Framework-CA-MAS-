const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.patch("/whishlistAdjust", async function async(req, res) {
    const results = await loadUserHistory(req);
    res.send(JSON.stringify(results)).status(200);
});

async function loadUserHistory(req) {
    try {

        console.log("patch request");
        const movieId = req.body.movieId;
        const loggedUserId = req.body.userId;
        const WhishList = database.collection('WhishList');
        const whishListRecord = await WhishList.findOne({ movieId: movieId, userId: loggedUserId });
        console.log("dddddd"+whishListRecord)
        if (whishListRecord != null) {
            // delete one           
            const updatedValues = await WhishList.deleteOne({ _id: new ObjectId(whishListRecord._id) });
            return updatedValues;
        }
        else {      
            const docs = [
                { movieId: movieId, userId: loggedUserId }
            ];
            const updatedValues = await WhishList.insertMany(docs);
            return updatedValues;
            // add one
        }

    }
    finally {
        //await client.close();
    }
}


module.exports = app;