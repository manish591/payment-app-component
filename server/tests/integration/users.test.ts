import request from "supertest";
import app from "../../app";

describe("testing the users route", function() {
  test("it should return test data", async function() {
    const response = await request(app).get("/api/users");
    expect(response.body.message).toBe("user data");
    expect(response.status).toBe(200);
  });
});