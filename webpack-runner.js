import webpack from "webpack";
import webpackConfig from "./webpack.config.js";

const mode = "production";
const config = await webpackConfig(mode);
const compiler = webpack(config);
compiler.run();
