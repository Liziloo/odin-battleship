import merge from "webpack-merge";
import commonConfig from "./webpack.common";

const prodConfig = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
});

export default prodConfig;