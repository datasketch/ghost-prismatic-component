import type { Connection } from "@prismatic-io/spectral";
import GhostAdminAPI from "@tryghost/admin-api";
import omit from "lodash.omit";

interface BrowseParams {
  filter?: string;
  limit?: "all" | number;
  page?: number;
  order?: string;
}

interface Pagination {
  next: number | null;
}

async function getAll(
  resource: {
    browse: (
      params: BrowseParams,
    ) => Promise<unknown[] & { meta: { pagination: Pagination } }>;
  },
  opts: Record<string, string>,
) {
  let result: unknown[] = [];
  let done = false;
  let page = 1;

  do {
    const data = await resource.browse({ ...opts, page });
    result = result.concat(data);

    if (!data.meta.pagination.next) {
      done = true;
    }
    page++;
  } while (!done);

  return result;
}

export const createClient = (connection: Connection) => {
  const api = new GhostAdminAPI({
    url: connection.fields.adminDomain,
    version: "v5.0",
    key: connection.fields.adminApiKey,
  });
  return {
    getPosts: (params: BrowseParams = {}) => {
      if (params.limit === "all") {
        return getAll(api.posts, omit(params, ["limit", "page"]));
      }
      return api.posts.browse(params);
    },
    getMembers: (params: BrowseParams = {}) => {
      if (params.limit === "all") {
        return getAll(api.members, omit(params, ["limit", "page"]));
      }
      return api.members.browse(params);
    },
  };
};
