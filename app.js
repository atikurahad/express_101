const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const userRouter = require("./src/routes/users.routes");
const activityLogger = require("./src/middlewares/logger");

//morgan
app.use(morgan("combined"));

// API routes
app.use("/api/user", userRouter);

app.use(activityLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Custom Middleware",
  });
});

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
