# Vue.js

- 各種バージョンについて
- Vue1
  - 2015 年にリリース
- Vue2
  - 2016 年にリリース
- Vue3(One Piece)
  - 2020 年 9 月 18 日にリリース
  - 2020/11/01 現在、ちょうど移行期なのでライブラリがまだ出そろっておらず本格手には手を付けないほうがよさそう

## Docs

- [公式ドキュメント](https://v3.vuejs.org/guide/introduction.html)

## Helloworld

```
# vuecliのインストール
# 基本的に、vueのプロジェクトディレクトリの作成や、プラグインの追加などはvuecliで行われる
$ npm install -g @vue/cli


# プロジェクトの作成
# 途中で入力を求められるので、 'Default (Vue 3 Preview)', 'yarn' を選択
$ vue create helloworld-app

$ cd helloworld-app

# typescriptを使えるようにする
$ vue add typescript

$ yarn serve
```

## UI Framework

- [Vuetifyjs](https://vuetifyjs.com/en/) が人気らしい
- ただし、2020/11/01 時点では、Vue3 に対応してないので利用するには少し待つ必要がある
  - https://vuetifyjs.com/en/introduction/roadmap/
  - v3.0 (Titan)
  - Target Release: Q1 2021
  - Alpha: Q4 2020

```
# v3でvue add 仕様とするとエラーがでる
$ vue add vuetify
ERROR  Error: You cannot call "get" on a collection with no paths. Instead, check the "length" property first to verify at least 1 path exists.
```
