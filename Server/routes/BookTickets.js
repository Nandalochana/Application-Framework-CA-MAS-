const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/BookTickets", async function async(req, res) {
    const results = await addValues(req);
    res.send(JSON.stringify(results)).status(200);
});

async function addValues(req) {
    try {
        const movies = database.collection('Movies');
        const movie = await movies.findOne({ _id: new ObjectId(req.body.movieId) })
        const count = req.body.count;
        const movieId = req.body.movieId;
        const userId = req.body.userId;
        const email = req.body.email;
        console.log(req.body);
        if (movie.maxcount > count) {
            const newValue = movie.maxcount - count;
            const updatedValues = await movies.updateOne({ _id: new ObjectId(req.body.movieId) }, { $set: { maxcount: newValue } })
            //console.log("Updated : " + updatedValues);

            const bookingInfo = database.collection('User_Booking');
            const docs = [
                { UserId: userId, movieId: movieId, userEmail: email, count: count }
            ];
            const addingValue = await bookingInfo.insertMany(docs);
           // console.log(addingValue.insertedIds[0]);
            let results = await movies.find().toArray();
            for (var item of results) {
                //console.log(req.query.email + ""+ req.query.password);
                if (item._id.equals(movieId)) {
                    console.log('Movie Found : ', [item._id]);
                    return item;
                }
                else {
                    //console.log(item.movieName);
                    console.log('Not Matching : ', [item._id]);
                }
            }

        }
        else {
            console.log("No bookings");
            return "Invalid Booking Numbers";
        }
    }
    finally {
        //await client.close();
    }

}

module.exports = app;