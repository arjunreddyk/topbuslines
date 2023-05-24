const app = require("../app.js");
const request = require("supertest");
const axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
const journeyPatterns = require("./mocks/journeyPatterns.json");
const stops = require("./mocks/stops.json");
const { url1, url2 } = require("../constants.js");

describe("handler", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should return 200 OK", async () => {
    mock.onGet(url1).reply(200, journeyPatterns).onGet(url2).reply(200, stops);

    const response = await request(app).get("/api/lines");
    expect(response.statusCode).toEqual(200);
  });

  it("should return list of top lines with number of stops", async () => {
    const expected = [
      ["3", 3],
      ["2", 2],
      ["1", 1],
    ];
    mock.onGet(url1).reply(200, journeyPatterns).onGet(url2).reply(200, stops);

    const response = await request(app).get("/api/lines");
    expect(response.body.topLines).toHaveLength(3);
    expect(response.body.topLines).toEqual(expect.arrayContaining(expected));
  });

  it("should return lines lines with stops", async () => {
    const expected = {
      1: [
        {
          DirectionCode: "1",
          JourneyPatternPointNumber: "10008",
          LastModifiedUtcDateTime: "2022-02-15 00:00:00.000",
          ExistsFromDate: "2022-02-15 00:00:00.000",
          LineNumber: "1",
          stopName: "S:t Eriksgatan",
        },
      ],
      2: [
        {
          DirectionCode: "1",
          ExistsFromDate: "2023-03-07 00:00:00.000",
          JourneyPatternPointNumber: "10012",
          LastModifiedUtcDateTime: "2023-03-07 00:00:00.000",
          LineNumber: "2",
          stopName: "Celsiusgatan",
        },
        {
          DirectionCode: "1",
          ExistsFromDate: "2022-08-10 00:00:00.000",
          JourneyPatternPointNumber: "10014",
          LastModifiedUtcDateTime: "2022-08-10 00:00:00.000",
          LineNumber: "2",
          stopName: "Scheelegatan",
        },
      ],
      3: [
        {
          DirectionCode: "1",
          ExistsFromDate: "2022-02-01 00:00:00.000",
          JourneyPatternPointNumber: "10016",
          LastModifiedUtcDateTime: "2022-02-01 00:00:00.000",
          LineNumber: "3",
          stopName: "Kungsbroplan",
        },
        {
          DirectionCode: "1",
          ExistsFromDate: "2022-02-17 00:00:00.000",
          JourneyPatternPointNumber: "10024",
          LastModifiedUtcDateTime: "2022-02-17 00:00:00.000",
          LineNumber: "3",
          stopName: "Hötorget",
        },
        {
          DirectionCode: "1",
          ExistsFromDate: "2022-03-18 00:00:00.000",
          JourneyPatternPointNumber: "10034",
          LastModifiedUtcDateTime: "2022-03-18 00:00:00.000",
          LineNumber: "3",
          stopName: "Humlegården",
        },
      ],
    };

    mock.onGet(url1).reply(200, journeyPatterns).onGet(url2).reply(200, stops);

    const response = await request(app).get("/api/lines");
    expect(response.body.linesWithStops).toEqual(expected);
  });
});
