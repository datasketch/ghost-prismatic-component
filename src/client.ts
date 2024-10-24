import type { Connection } from "@prismatic-io/spectral";
import GhostAdminAPI from "@tryghost/admin-api";

interface BrowseParams {
  filter?: string;
  limit?: number;
  page?: number;
  order?: string;
}

export const createClient = (connection: Connection) => {
  const api = new GhostAdminAPI({
    url: connection.fields.adminDomain,
    version: "v5.0",
    key: connection.fields.adminApiKey,
  });
  return {
    getPosts: (params: BrowseParams = {}) => {
      return api.posts.browse(params);
    },
    getMembers: (params: BrowseParams = {}) => {
      return api.members.browse(params);
    },
  };
};
