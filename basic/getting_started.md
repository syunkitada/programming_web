# Getting Started

- JavaScriptの開発環境を整えます
  - JavaScriptを直接書くことはせず、TypeScriptで開発することを想定します
- JavaScriptのランタイムは、nodejsを利用します
- タスクランナーには、Webpackを利用します

## node, npm のインストール

- node のバージョン管理ツールについて
  - node の場合は基本的に最新のものを使えばよい（プロジェクトごとにバージョンを固定する必要はない）
  - 利用しているパッケージマネージャが最新の node を配ってるのであれば、パッケージマネージャでそのまま管理してもよい
  - そうでない場合は、n を利用する
    - https://www.npmjs.com/package/n
    - 採用理由は、npm でアップグレードが行えるため

```
# n のインストール方法
# 標準の方法でnodejs, npmをインストールする
$ sudo apt install -y nodejs npm

# npmでnをインストールする
$ sudo npm install --global n
/usr/bin/n -> /usr/lib/node_modules/n/bin/n

# nをインストールしたら、nodejs, npmは不要なので削除する
$ sudo apt remove -y nodejs npm

# 最新のLTSのnodejsをインストールする（アップグレードしたいときも同様）
$ sudo n lts
  installing : node-v16.17.0
       mkdir : /usr/local/n/versions/node/16.17.0
       fetch : https://nodejs.org/dist/v16.17.0/node-v16.17.0-linux-x64.tar.xz
     copying : node/16.17.0
   installed : v16.17.0 (with npm 8.15.0)

# バージョンを確認
$ node --version
v16.17.0

$ npm --version
8.15.0
```

```
# npm packageのインストール先を設定する
# npm config setによって、設定ファイル ~/.npmrc が作成される
$ mkdir -p "${HOME}/.npm-packages"
$ npm config set prefix "${HOME}/.npm-packages"

# PATHを設定（これはzshrcにも書いておく）
$ export PATH="${HOME}/.npm-packages/bin:${PATH}"
```

## プロジェクトの始め方

- [webpack_v1](webpack_v1/README.md) を参照してください
