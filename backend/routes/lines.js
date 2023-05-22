var express = require("express");
var router = express.Router();
const lines = require("../mocks/lines.json");
const utils = require("../utils/utils");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(utils);
});

module.exports = router;
