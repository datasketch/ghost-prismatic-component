import type { Connection } from "@prismatic-io/spectral";
import GhostAdminAPI from "@tryghost/admin-api";

export const createClient = (connection: Connection) => {
  const api = new GhostAdminAPI({
    url: connection.fields.adminDomain,
    version: "v5.0",
    key: connection.fields.adminApiKey,
  });
  return {
    getPosts: () => {
      return api.posts.browse();
    },
  };
};
