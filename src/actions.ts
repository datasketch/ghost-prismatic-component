import { action, input, util } from "@prismatic-io/spectral";

import { createClient } from "./client";

const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

const limit = input({
  label: "Limit",
  type: "string",
  default: "15",
  required: false,
  clean: (value) => util.types.toNumber(value),
});

const page = input({
  label: "Page",
  type: "string",
  default: "1",
  required: false,
  clean: (value) => util.types.toNumber(value),
});

// const filter = input({})
// const order = input({})

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

export default { getPosts };
