const express = require("express");
const fs = require("fs");
const app = express();

app.get("/about", (req, res) => {
  res.status(200).send({
    message: "This is about page  ",
    description: "I am from about page",
  });
});

app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.get("/faq", (req, res) => {
  res.status(200).json([
    {
      question: "What is this platform?",
      answer: "This is for all the people who want to learn Express.js.",
    },
    {
      question: "Is this platform free?",
      answer: "Yes, it is completely free to use.",
    },
    {
      question: "Can I contribute?",
      answer:
        "Yes! You can contribute by submitting tutorials and code examples.",
    },
  ]);
});

app.get("/content", (req, res) => {
  res.status(200).json({
    data: [
      {
        question: "What is this platform?",
        answer: "This is for all the people who want to learn Express.js.",
        readTime: "20 min",
      },
      {
        question: "Is this platform free?",
        answer: "Yes, it is completely free to use.",
        readTime: "20 min",
      },
      {
        question: "Can I contribute?",
        answer:
          "Yes! You can contribute by submitting tutorials and code examples.",
        readTime: "20 min",
      },
    ],
  });
});
app.get("/question", (req, res) => {
  res.status(200).json({
    data: [
      {
        question: "What is this platform?",
        answer: "This is for all the people who want to learn Express.js.",
      },
      {
        question: "Is this platform free?",
        answer: "Yes, it is completely free to use.",
      },
      {
        question: "Can I contribute?",
        answer:
          "Yes! You can contribute by submitting tutorials and code examples.",
      },
    ],
  });
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
