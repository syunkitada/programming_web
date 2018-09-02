# Redux Basics With React
* This is refer to [Official: basics](https://redux.js.org/basics/usagewithreact)


## Setup Development Environment (Using yarn)
* Install redux, react-redux

```
yarn add redux react-redux
```


## メモ
* Presentational Components
    * componentsディレクトリ
    * 描画のためのコンポーネント
    * データの管理はせず、Propsからデータを読み込み、描画し、コールバックの設定を行うのみ
    * Reduxは関与せず、依存もしない
* Container Components
    * containersディレクトリ
    * 動作のためのコンポーネント
    * Reduxによって管理され、データ取得・状態更新を行う
