const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/UserHistoryLoad", async function async(req, res) {
    const results = await loadUserHistory(req);
    res.send(JSON.stringify(results)).status(200);
});

async function loadUserHistory(req) {
    try {
        console.log("test :"+ req.query)
        const dataset = [];
        const users = database.collection('User_Info');
        const movies = database.collection('Movies');
        const user = await users.findOne({ _id: new ObjectId(req.query.id) })
        if (user != null) {
            const bookingInfo = database.collection('User_Booking');
            if (user.userType == 1) {
                // load all information
                let results = await bookingInfo.find().toArray();
               // console.log("final result"+results);
                for(var item of results) {
                    const movieInfo = await movies.findOne({ _id: new ObjectId(item.movieId) })
                    dataset.push(createData(item._id,movieInfo.movieName,movieInfo.date,movieInfo.time,movieInfo.location,movieInfo.price,item.count));  
                 }

            }
            else {

                let results = await bookingInfo.find().toArray();
                //console.log("final result"+results);
                for(var item of results) {
                    
                    if(item.UserId == user._id){
                    const movieInfo = await movies.findOne({ _id: new ObjectId(item.movieId) })
                    dataset.push(createData(item._id,movieInfo.movieName,movieInfo.date,movieInfo.time,movieInfo.location,movieInfo.price,item.count)); 
                    } 
                 }

            }
        }
        else {
            return " Invalid User Credentials"
        }

        return dataset
    }
    finally {
        //await client.close();
    }

}

function createData(_id, movieName, date, time, location, ticketprice, ticketcount) {
    return { _id, movieName, date, time, location, ticketprice, ticketcount };
  }

module.exports = app;