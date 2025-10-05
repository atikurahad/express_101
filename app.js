const express = require("express");
const path = require("path");

const app = express();

const userRouter = require("./src/routes/users.routes");

// API routes
app.use("/api/user", userRouter);

// query params
// app.get("/", (req, res) => {
//   const { name, id } = req.query;
//   res.send(`<h1> req id is :${id} name is ${name} </h1>`);
// });

// route params

// app.get("/reqId/:id/age/:age", (req, res) => {
//   const { id, age } = req.params;

//   res.send(`<h1> req id is :${id} age is ${age} </h1>`);
// });

//header params
app.get("/reqId/:id/age/:age", (req, res) => {
  const age = req.header("age");
  const id = req.header("id");

  res.send(`<h1> req id is :${id} age is ${age} </h1>`);
});

// Login route
app.get("/login", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "src/views/login.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 not found");
});

module.exports = app;
