import { action, input } from "@prismatic-io/spectral";

import { createClient } from "./client";

const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const getPosts = action({
  display: {
    label: "Get posts",
    description: "Get lists of posts filtered by various criteria.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection);
    return {
      data: await client.getPosts(),
    };
  },
  inputs: {
    connection,
  },
});

export default { getPosts };
