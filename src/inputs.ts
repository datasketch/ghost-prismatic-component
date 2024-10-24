import { input, util } from "@prismatic-io/spectral";

// const filter = input({})
// const order = input({})

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const limit = input({
  label: "Limit",
  type: "string",
  default: "15",
  required: false,
  clean: (value) => util.types.toNumber(value),
});

export const page = input({
  label: "Page",
  type: "string",
  default: "1",
  required: false,
  clean: (value) => util.types.toNumber(value),
});
