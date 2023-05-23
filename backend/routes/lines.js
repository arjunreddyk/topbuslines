const express = require("express");
const router = express.Router();
const axios = require("axios");

const utils = require("../utils/utils");
const { url1, url2 } = require("../constants.js");

router.get("/", async function (req, res, next) {
  const [journeyPatternPointOnLine, stops] = await axios.all([
    axios.get(url1),
    axios.get(url2),
  ]);

  const { data: patternData } = journeyPatternPointOnLine;
  const { data: stopData } = stops;

  if (patternData.StatusCode !== 0 || stopData.StatusCode !== 0) {
    res.status(503).json({ error: { ...patternData, ...stopData } });
  } else {
    const topLines = utils.getTopTenLines({
      journeyPatterns: patternData,
      stops: stopData,
    });

    res.json(topLines);
  }
});

module.exports = router;
