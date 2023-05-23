const app = require("../app.js");
const request = require("supertest");
const axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
const journeyPatterns = require("../mocks/journeyPatterns.json");
const stops = require("../mocks/stops.json");
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
    mock.onGet(url1).reply(200, journeyPatterns).onGet(url2).reply(200, stops);

    const response = await request(app).get("/api/lines");
    expect(response.body.linesWithStops).toEqual({});
  });
});
