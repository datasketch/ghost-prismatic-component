import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "ghost",
  public: false,
  display: {
    label: "Ghost",
    description:
      "Ghost is a powerful app for professional publishers to create, share, and grow a business around their content. It comes with modern tools to build a website, publish content, send newsletters & offer paid subscriptions to members.",
    iconPath: "icon.png",
  },
  actions,
  connections,
});
