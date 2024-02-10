import { dirname, resolve } from "path";
import { argv } from "process";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (_, argv) => {
  const mode = argv;

  return {
    target: "node",
    mode: mode,
    entry: "./src/app.ts",
    output: {
      path: resolve(__dirname, "./dist"),
      filename: "app.js",
      library: {
        type: "module",
      },
      chunkFormat: "module",
    },
    experiments: {
      outputModule: true,
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    devtool: false,
  };
};
