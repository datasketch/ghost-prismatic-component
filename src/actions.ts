import { action } from "@prismatic-io/spectral";

import { createClient } from "./client";
import { connection, limit, page } from "./inputs";

export const getPosts = action({
  display: {
    label: "Get posts",
    description: "Get lists of posts filtered by various criteria.",
  },
  perform: async (context, { connection, limit, page }) => {
    const client = createClient(connection);
    return {
      data: await client.getPosts({ limit, page }),
    };
  },
  inputs: {
    connection,
    limit,
    page,
  },
});

export const getMembers = action({
  display: {
    label: "Get members",
    description: "Get lists of members filtered by various criteria.",
  },
  perform: async (context, { connection, limit, page }) => {
    const client = createClient(connection);
    return {
      data: await client.getMembers({ limit, page }),
    };
  },
  inputs: {
    connection,
    limit,
    page,
  },
});

export default { getPosts, getMembers };
