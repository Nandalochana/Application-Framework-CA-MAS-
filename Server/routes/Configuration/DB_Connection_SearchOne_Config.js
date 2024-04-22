const { MongoClient } = require("mongodb");
/**
 * Create a DB connection for one single search in DB
 * Note: other implementation can use this same connection 
 */
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('moviebooking');
function searchQuery(query) {
  async function run() {
    try {
      const movies = database.collection('LoginInfo');
      let movie = await movies.findOne(query);
      console.log(movie)
      //return movie
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

  }
  run().catch(console.dir);
}

module.exports = {
  searchQuery
}