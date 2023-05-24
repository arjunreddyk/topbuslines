const countBy = require("lodash/countBy");
const groupBy = require("lodash/groupBy");
const pickBy = require("lodash/pickBy");

const getTopTenLines = ({ journeyPatterns, stops }) => {
  const linePattern = journeyPatterns.ResponseData.Result;
  const stopsNames = stops.ResponseData.Result;

  const filterOneWay = linePattern.filter((obj) => obj.DirectionCode === "1");
  const groupByLineNumbers = groupBy(filterOneWay, "LineNumber");
  const totalStopsPerLine = countBy(filterOneWay, "LineNumber");

  const topLines = Object.entries(totalStopsPerLine)
    .sort((a, b) => b[1] - a[1])
    .splice(0, 10);

  const linesWithStops = pickBy(groupByLineNumbers, (_, key) =>
    topLines.map((line) => line[0]).includes(key)
  );

  for (const key in linesWithStops) {
    linesWithStops[key].map((point, i, arr) => {
      return stopsNames.map((stop) => {
        if (point.JourneyPatternPointNumber === stop.StopPointNumber) {
          arr[i] = { ...point, stopName: stop.StopPointName };
        }
      });
    });
  }
  return { topLines, linesWithStops };
};

module.exports = { getTopTenLines };
