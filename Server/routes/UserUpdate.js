const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
var express = require("express")
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.put("/UserUpdate", async function async(req, res) {
    const results = await userUpdate(req);
    res.send(JSON.stringify(results)).status(200);
});

async function userUpdate(req) {
    try {
        const user = database.collection('User_Info');
        console.log(req.body);
        const updatedValues = await user.updateOne({_id: new ObjectId(req.body.myId)}, { $set: {fullName: req.body.fullName, email: req.body.email, password: req.body.password, address: req.body.address,userType:req.body.userType}}) 
        // display the results of your operation
        console.log(updatedValues);
        let results = await user.find().toArray();
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