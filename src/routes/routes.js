import loadable from "loadable-components";

export const Home = loadable(() => import("../scenes/home"));

export const url = {
  home: "/"
};
