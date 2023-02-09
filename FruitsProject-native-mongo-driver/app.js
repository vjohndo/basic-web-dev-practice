const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://127.0.0.1:27017";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection !THIS IS WHERE THE DB NAME GOES!
    const products = await client.db("shopDB").collection("products");
    const doc = {
        _id: 4,
        name: "ruler",
        price: 3,
    }
    
    const product = await products.findOne({name: "ruler"})

    // // Insert method
    // const result = await products.insertOne(doc);
    console.log(product);
    console.log("Command enacted, found");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);