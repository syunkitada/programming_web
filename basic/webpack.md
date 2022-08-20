# webpack

- JavaScript や CSS や画像などのモジュールを一つのファイルにまとめるモジュールバンドラとしての機能を持つ
- タスクランナーとしての機能も持ち、ファイルが更新されたらタスクを実行するような機能を持つ
- 参考リンク
  - [公式](https://webpack.js.org/)
  - [最新版 TypeScript+webpack 5 の環境構築まとめ](https://ics.media/entry/16329/#webpack-ts-react)

## Scripts

```
# package.jsonに記載されたパッケージをインストールする
yarn install

# devserverを開始する
yarn start

# --mode=productionでbuild
yarn build
```

## package.json

- パッケージのメタデータを定義するためのファイル
- name
  - モジュール名
- version
  - モジュールのバージョン
- license
  - ライセンス情報
- private
  - このプロパティが true になっていると、モジュールの公開ができない
  - 公開しないプロジェクトは誤って公開しないように true にしておく
- main
  - モジュールの中で最初に呼ばれるスクリプトファイル
- scripts
  - コマンドへのエイリアス
  - yarn build, yarn start などでコマンドを実行できる
  - 以下の例だと、$ yarn start と実行することは、$ npx webpack serve を実行したことに相当する
- devDependencies
  - 開発用の依存モジュールを定義する
  - 開発用のコマンドツール類はこちらに定義する
- dependencies
  - 本場番用の依存モジュールを定義する

```
{
    "name": "web-samples",
    "version": "1.0.0",
    "main": "index.tsx",
    "license": "MIT",
    "private": true,
    "scripts": {
        "build": "webpack --mode=production",
        "start": "webpack serve"
    },
    "devDependencies": {
        "webpack": "^5.21.0",
        "webpack-cli": "^4.5.0",
        "webpack-dev-server": "^3.11.2",
        "css-loader": "^5.0.1",
        "style-loader": "^2.0.0",
        "ts-loader": "^8.0.15",
        "typescript": "^4.1.3"
    }
}

```

## webpack.config.js

- webpack の設定ファイル

```
module.exports = {
  // モード値を production に設定すると最適化された状態で出力される
  //  development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  // mode: 'production',

  // エントリーポイント: 相対パス
  entry: `./src/index.tsx`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名: 絶対パス
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  },

  // モジュールの設定
  // Loaderモジュールを利用すると、JS以外のCSSやTypeScriptなどをバンドルすることができる
  // 利用可能なLoaderモジュール: https://webpack.js.org/loaders/
  module: {
    rules: [
      {
        // 拡張子が .css の場合、style-loader, css-loaderを利用する
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        // 拡張子が .ts もしくは .tsx の場合、ts-loaderを利用する
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  // モジュールをimportする際の解決方法の設定
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    // .ts や .tsx ファイルをimportできるようにする
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  // 開発サーバ(webpack serve) の設定
  devServer: {
    host: "0.0.0.0",
    port: "3000",
    contentBase: "dist"
  }
};
```

## tsconfig.json

- typescript の設定ファイル
- compilerOptions
  - "jsx": "react"
    - react をコンパイルする場合は必要
- include
  - ソースファイルのディレクトリを記述する

```
{
    "compilerOptions": {
        "jsx": "react"
    },
    "include": ["src"]
}
```
