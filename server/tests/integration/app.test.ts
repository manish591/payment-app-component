import request from "supertest";
import app from "../../app";

describe("testing the base url", function() {
  test("it should return text data", async function() {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});