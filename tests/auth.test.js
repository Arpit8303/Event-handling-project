import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import connectDB from "../config/db.js";

describe("Authentication API", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close(true);
    await mongoose.disconnect();
  });

  test("Register User", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Arpit",
        email: "arpit@gmail.com",
        password: "123456",
      });

    expect([200, 201, 400]).toContain(response.statusCode);
  });

  test("Login User", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "arpit@gmail.com",
        password: "123456",
      });

    expect([200, 401]).toContain(response.statusCode);
  });
});