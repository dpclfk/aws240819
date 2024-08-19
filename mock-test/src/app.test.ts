import request from "supertest";
import { config } from "dotenv";

import app from "./app";

config();

describe("Test Express App", () => {
  test("Get / retrun AWS's Members", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Now Testing");
  });
});
