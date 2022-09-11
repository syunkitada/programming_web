# React

## 最低限の依存モジュールをインストール

```
$ npm install react@latest react-dom@latest @types/react @types/react-dom
```


## クラスコンポーネントと関数コンポーネントのどちらを使うべきか？

- 結論
  - 基本的には関数コンポーネントを使うべき、継承できるようにする場合はクラスコンポーネントを使う
- どちらも機能的にできることは一緒
  - fooksの機能がなかったころは、関数コンポーネントは微妙だったが今はfooksと組み合わせることでクラスコンポーネントと同等のことができる
- 関数コンポーネントのほうが記述が用意
- 関数コンポーネントのほうがstatefulなどのロジックの再利用が容易（ロジックをモジュール管理しやすくなった）



## 参考・メモ

- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
  - 関数コンポーネントを使う場合は閲覧必須
- [React/Next.jsでの俺的ベストプラクティスを見てくれ](https://zenn.dev/boke0/articles/12e81125813b18)
  - react hookの利用例
- SPA関連メモ
  - [React SPA の技術選定で考えたこと（atama plus のケーススタディ）](https://zenn.dev/atamaplus_dev/articles/30832dda37da52)
  - [ReactLocation: react-location vs react-router](https://react-location.tanstack.com/comparison)
- [react-icons](https://react-icons.github.io/react-icons)
- Next.jsと Nuxt.js
  - Reactをベースに開発されたJavaScriptフレームワークで、サーバ側の機能も組み込まれている（分離できない）
  - 基本的にサーバ機能とセットのモノなので、他のサーバアプリケーションと組み合せてCSRとして使うことができない（たぶん）
    - フロントエンドはNext.jsで、APIは
  - Nuxt.jsはNext.jsのVue版
