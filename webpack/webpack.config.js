module.exports = {
  mode: 'development',
  // mode: 'production',

  entry: `./src/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js'
  },

  devServer: {
    host: '0.0.0.0',
    port: '9090',
    contentBase: 'dist',
  },
};
