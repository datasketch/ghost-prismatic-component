import { getPosts } from "./actions";
import { ghostConnection } from "./connections";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";

const connection = createConnection(ghostConnection, {
  adminDomain: process.env.GHOST_ADMIN_DOMAIN,
  contentApiKey: process.env.GHOST_CONTENT_API_KEY,
  adminApiKey: process.env.GHOST_ADMIN_API_KEY,
});

describe("actions", () => {
  test("should return list of posts", async () => {
    const { result } = await invoke(getPosts, { connection });
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toHaveProperty("meta");
    expect(result.data.meta).toHaveProperty("pagination");
    expect(Object.keys(result.data.meta.pagination)).toEqual(
      expect.arrayContaining([
        "page",
        "limit",
        "pages",
        "total",
        "next",
        "prev",
      ]),
    );
  });
});
