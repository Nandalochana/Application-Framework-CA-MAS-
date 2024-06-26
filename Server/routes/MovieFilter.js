const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/MovieFilter", async function async(req, res) {
    const results = await movieFilter(req);
    res.send(JSON.stringify(results)).status(200);
});

async function movieFilter(req) {
    try {
        const movies = database.collection('Movies');
        let results = await movies.find().toArray();
        const docs = [
            { movieName: req.body.movieName, date: req.body.date, time: req.body.time, location: req.body.location, maxcount: req.body.maxcount }
        ];

        var filterValues = [];
        for (var item of results) {
            if (req.body != null) {
                if (req.body.movieName != "") {
                    if (item.movieName != null && item.movieName.toLowerCase() === req.body.movieName.toLowerCase()) {

                        filterValues.push(item);
                    }

                }
                else {

                    filterValues.push(item);
                }
            }
            else {
                filterValues.push(item);
            }
        }
        var datefilterValues = [];

        for (var item of filterValues) {
            if (req.body != null) {
                if (req.body.date != "") {
                    if (item.date != null && item.date.toLowerCase() === req.body.date.toLowerCase()) {

                        datefilterValues.push(item);
                    }

                }
                else {

                    datefilterValues.push(item);
                }
            }
            else {
                datefilterValues.push(item);
            }
        }
        var timefilterValues = [];
        for (var item of datefilterValues) {
            if (req.body != null) {
                if (req.body.time != "") {
                    if (item.time != null && item.time.toLowerCase() === req.body.time.toLowerCase()) {

                        timefilterValues.push(item);
                    }

                }
                else {

                    timefilterValues.push(item);
                }
            }
            else {
                timefilterValues.push(item);
            }
        }


        var locationfilterValues = [];
        for (var item of timefilterValues) {
            if (req.body != null) {
                if (req.body.location != "") {
                    if (item.location != null && item.location.toLowerCase() === req.body.location.toLowerCase()) {

                        locationfilterValues.push(item);
                    }

                }
                else {

                    locationfilterValues.push(item);
                }
            }
            else {
                locationfilterValues.push(item);
            }
        }

        var maxfilterValues = [];
        for (var item of locationfilterValues) {
            if (req.body != null) {
                if (req.body.maxcount != "") {
                    if (item.maxcount != null && item.maxcount.toLowerCase() === req.body.maxcount.toLowerCase()) {

                        maxfilterValues.push(item);
                    }

                }
                else {

                    maxfilterValues.push(item);
                }
            }
            else {
                maxfilterValues.push(item);
            }
        }

        var pricefilterValues = [];
        for (var item of maxfilterValues) {
            if (req.body != null) {
                if (req.body.price != "") {
                    if (item.price != null && item.price.toLowerCase() === req.body.price.toLowerCase()) {

                        pricefilterValues.push(item);
                    }

                }
                else {

                    pricefilterValues.push(item);
                }
            }
            else {
                pricefilterValues.push(item);
            }
        }
        var finalList = [];
        const loggedUserId = req.body.userId;
        const whishList = database.collection('WhishList');

        for (var item of pricefilterValues) {
            if (loggedUserId != null) {
                const whishListRecord = await whishList.find().toArray();
                var value = false;
                for(var wish of whishListRecord) {
                    console.log(JSON.stringify(whishListRecord));
                    if(wish.movieId  == item._id  && wish.userId==loggedUserId ){
                        value = true;
                    }
                     
                 } 
                 
                 if (value) {
                    item["color"] = "success";
                    item["visible"] = "";
                    finalList.push(item);
                }
                else {
                    item["color"] = "disabled";
                    item["visible"] = "";
                    finalList.push(item);
                }



            }
            else {
                item["visible"] = "none";
                item["color"] = "disabled";
                finalList.push(item);
            }
        }


        return finalList;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //await client.close();
    }

}

module.exports = app;