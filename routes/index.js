const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  // res.render('index', { title: 'Express' });
  res.json({ message: "Hello from backend!" });
});

module.exports = router;
