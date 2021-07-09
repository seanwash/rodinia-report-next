import { testClient } from "../../utils/testClient";
import handler from "../../../pages/api/stories/index";

describe("GET /api/stories", () => {
  it("should return a list of stories", async () => {
    const client = await testClient(handler);
    const op = await client.get("/");

    expect(op.statusCode).toBe(200);
    expect(op.body).toHaveProperty("stories", expect.any(Array));
  });

  // This could probably be a unit test?
  it.todo("should include reactions along with the story");

  it.todo("should allow filtering by topics");
});

export {};
