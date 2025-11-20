// const app = require("./app");

const express = require("express");
const cors = require("cors");
const app = express();

//middlewares
app.use(express.json());
app.use(cors());



//connecting to the database
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://adifanan79:adifanan79@practiceshop.5j9ijl6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: true,
});

async function run() {
  try {
    await client.connect();

    //create db and collections
    const db = client.db("practiceShopDB");
    const usersCollection = db.collection("users");

    // insert a test user
    app.post("/add-user", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
      // usersCollection.insertOne()
    });

    await client.db("admin").command({ ping: 1 });

    console.log("MongoDB Connected Successfully!☁️ 🪐");
  } catch (err) {
    console.log("Mongo DB ERROR:", err);
  }
}

run();

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
