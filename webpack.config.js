import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default (_, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    target: 'node',
    mode: isProduction ? 'production' : 'development',
    entry: './src/app.ts',
    output: {
      path: resolve(__dirname, './dist'),
      filename: 'bundle.js',
      chunkFormat: 'commonjs',
    },
    experiments: {
      outputModule: true,
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /.m?js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: isProduction ? false : 'source-map',
  }
}
