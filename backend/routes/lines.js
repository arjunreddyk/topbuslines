var express = require("express");
var router = express.Router();
const lines = require("../mocks/lines.json");
const utils = require("../utils/utils");
const axios = require("axios");

router.get("/", async function (req, res, next) {
  let url1 = "https://jsonplaceholder.typicode.com/posts/1";
  let url2 = "https://jsonplaceholder.typicode.com/posts/3";
  //https://api.sl.se/api2/LineData.json?model=jour&key=${process.env.TRAFIK_KEY}&DefaultTransportModeCode=BUS
  let request1 = axios.get(url1);
  let request2 = axios.get(url2);
  const [answer1, answer2] = await axios.all([request1, request2]);

  res.json({ ...answer1.data, ...answer2.data });
});

module.exports = router;
