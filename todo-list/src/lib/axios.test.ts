import MockAdapter from "axios-mock-adapter";

import instance from "./axios";

const mock = new MockAdapter(instance);

// jest.mock("axios");

describe("Test Axios", () => {
  test("Get /api", async () => {
    // (instance.get as jest.Mock).mockResolvedValue("Now Testing");
    const data = "Now Testing";

    mock.onGet("/").reply(200, data);

    const response = (await instance.get("/")).data;
    expect(response).toBe(data);
  });
});
