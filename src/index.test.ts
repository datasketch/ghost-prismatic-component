import { getPosts } from "./actions";
import { ghostConnection } from "./connections";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";

const connection = createConnection(ghostConnection, {
  // adminDomain: process.env.GHOST_ADMIN_DOMAIN,
  // contentApiKey: process.env.GHOST_CONTENT_API_KEY,
  // adminApiKey: process.env.GHOST_ADMIN_API_KEY,
  adminDomain: "https://tnc-marketing-staging.ghost.io",
  contentApiKey: "93ebd9cde7012fa63122661a53",
  adminApiKey:
    "6717dc54bafbd30001f0554a:1f9fb7ae78a6db925d2276c1173fb8a9af82f2e9febaa3836b6b9d6926a4f9a6",
});

describe("actions", () => {
  test("should return list of posts", async () => {
    const { result } = await invoke(getPosts, {
      connection,
      limit: 15,
      page: 1,
    });
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBe(15); // Ghost default page size
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

  test("should return limited posts", async () => {
    const { result } = await invoke(getPosts, {
      connection,
      limit: 10,
      page: 1,
    });
    expect(result.data.length).toBe(10);
  });

  test("should return offset posts", async () => {
    const { result } = await invoke(getPosts, {
      connection,
      limit: 15,
      page: 2,
    });
    expect(result.data.meta.pagination.page).toBe(2);
  });
});
