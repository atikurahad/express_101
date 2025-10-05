const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  //   res.status(200).json({
  //     message: " Login ",
  //   });

  res.cookie("name", "BBbbbbbbbbbbbbbb"); // name এর পরে স্পেসও ফেলে দাও
  res.status(200).json({ message: "Login successful, cookie set!" });
});
router.get("/register", (req, res) => {
  res.status(200).json({
    message: " Signup ",
  });
});
router.get("/forget", (req, res) => {
  res.status(200).json({
    message: " Forget ",
  });
});

module.exports = router;
