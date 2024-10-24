import { connection } from "@prismatic-io/spectral";

export const ghostConnection = connection({
  key: "ghostConnection",
  label: "Connection",
  inputs: {
    adminDomain: {
      label: "Admin Domain",
      placeholder: "https://demo.ghost.io",
      required: true,
      type: "string",
    },
    contentApiKey: {
      label: "Content API Key",
      placeholder: "",
      required: true,
      type: "string",
    },
    adminApiKey: {
      label: "Admin API Key",
      placeholder: "",
      required: true,
      type: "password",
    },
  },
});

export default [ghostConnection];
