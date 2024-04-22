const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/UserHistoryDelete", async function async(req, res) {
    const results = await loadUserHistory(req);
    res.send(JSON.stringify(results)).status(200);
});

async function loadUserHistory(req) {
    try {
        const bookingInfo = database.collection('User_Booking');
        const movies = database.collection('Movies');
        const user_booking = await bookingInfo.findOne({ _id: new ObjectId(req.query.id) })
        if (user_booking != null) {
            const movie = await movies.findOne({ _id: new ObjectId(user_booking.movieId) })
            const bookedValue = parseInt(user_booking.count) + parseInt(movie.maxcount);

            const updatedValues = await movies.updateOne({ _id: new ObjectId(user_booking.movieId) }, { $set: { maxcount: bookedValue } })
            await bookingInfo.deleteOne({ _id: new ObjectId(req.query.id) });
            return updatedValues;
        }
    }
    finally {
        //await client.close();
    }

}



module.exports = app;