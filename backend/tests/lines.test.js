const app = require("../app.js");
const request = require("supertest");
const axios = require("axios");
const sinon = require("sinon");

describe("route", () => {
  it("should return 200 OK", async () => {
    const stub = sinon
      .stub(axios, "get")
      .callsFake(() => Promise.resolve({ status: 200 }))
      .returns({ data: { hi: "hi" } });

    const response = await request(app).get("/api/lines").expect(200);
    sinon.assert.calledTwice(stub);
    expect(response.body).toEqual({ hi: "hi" });
  });
});
