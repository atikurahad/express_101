const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // route  find all users
    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        console.log(users);

        res.status(200).json({
          message: "Users retrieved successfully",
          data: users,
        });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Error retrieving users", error: error.message });
      }
    });

    //get single user
    app.get("/user/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        res.status(200).json({
          message: "User retrieved successfully",
          data: user,
        });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Error retrieving users", error: error.message });
      }
    });



    app.get("/users/user/:email", async (req, res) => {
      const email = req.params.email;

      try {
        const user = await usersCollection.findOne({ email },{name:0});

        if (!user) {
          return res.status(403).json({
            message: "No user found with this email",
          });
        }

        res.status(200).json({
          message: "User retrieved successfully",
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          message: "Server error",
          error: error.message,
        });
      }
    });



    app.patch(('/update-user/:id'), async(req,res)=>{

      const {id} = req.params;
      const userdata = req.body;

      try {
        const filter = {_id : new ObjectId(id)}
        const updateInfo = {
          $set:{
            name:userdata.name,
            age:userdata.age,
            email:userdata.email,
          }
        }

      } catch (error) {
        res.status(500).json({
          message: "Server error",
          error: error.message,
        });
      }

    })



    // delete user
   app.delete("/user/:id", async (req, res) => {
     const { id } = req.params;

     if (!ObjectId.isValid(id))
       return res.status(400).json({ message: "Invalid ID" });

     const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

     if (result.deletedCount === 0)
       return res.status(404).json({ message: "User not found" });

     res.json({ message: "User deleted successfully" });
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
