import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import connectDB from "../config/db.js";

describe("Event API", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close(true);
    await mongoose.disconnect();
  });

  test("Get All Events", async () => {
    const response = await request(app).get("/api/events");

    expect([200]).toContain(response.statusCode);
  });

  test("Get Event By Id", async () => {
    const response = await request(app).get("/api/events/123456789012345678901234");

    expect([200, 404]).toContain(response.statusCode);
  });
});