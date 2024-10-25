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
  clean: (value: unknown) => {
    const inputValue = util.types.toString(value).trim();
    if (/^\+d$/.test(inputValue)) {
      return util.types.toNumber(value);
    }
    if (inputValue.toLowerCase() === "all") {
      return "all";
    }
    throw new Error(`The value "${inputValue}" is not valid for this input`);
  },
  comments: "Write `all` to fetch all the data.",
});

export const page = input({
  label: "Page",
  type: "string",
  default: "1",
  required: false,
  clean: (value) => util.types.toNumber(value),
});
