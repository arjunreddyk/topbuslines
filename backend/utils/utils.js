const countBy = require("lodash/countBy");
const groupBy = require("lodash/groupBy");
const pickBy = require("lodash/pickBy");
const journeyPatterns = require("../mocks/journeyPatterns.json").ResponseData
  .Result;
const stops = require("../mocks/stops.json").ResponseData.Result;

const filterOneWay = journeyPatterns.filter((obj) => obj.DirectionCode === "1");
const groupByLineNumbers = groupBy(filterOneWay, "LineNumber");
const totalStopsPerLine = countBy(filterOneWay, "LineNumber");

const topTenLines = Object.entries(totalStopsPerLine)
  .sort((a, b) => b[1] - a[1])
  .splice(0, 10);

const pickTopTenLines = pickBy(groupByLineNumbers, (_, key) =>
  topTenLines.map((line) => line[0]).includes(key)
);

for (const key in pickTopTenLines) {
  pickTopTenLines[key].map((point, i, arr) => {
    return stops.map((stop) => {
      if (point.JourneyPatternPointNumber === stop.StopPointNumber) {
        arr[i] = { ...point, ...stop };
      }
    });
  });
}

module.exports = { topTenLines, pickTopTenLines };
