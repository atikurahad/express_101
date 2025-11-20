const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;

if (!uri) {
  console.error("URI not found in .env file!");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("MongoDB Connected Successfully! ☁️ 🪐");

    const db = client.db("practiceShopDB");
    const usersCollection = db.collection("users");

    // Route: Add user
    app.post("/add-user", async (req, res) => {
      try {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({
          message: "User added successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding user:", error);
        res
          .status(500)
          .json({ message: "Error adding user", error: error.message });
      }
    });

    // Ping test
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

// Run the app
run().catch(console.dir);

// Optional: Graceful shutdown
process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
