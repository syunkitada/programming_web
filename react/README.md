# React

## 最低限の依存モジュールをインストール

```
$ npm install react@latest react-dom@latest @types/react @types/react-dom
```

## 考え方

- 命令的UIと宣言的UIについて
  - 命令的UI
    - Howを記述する
      - タブBがクリックされたら、タブBがすでに表示されているかを確認し、表示されていなければタブBを表示する
  - 宣言的UI
    - Whatを記述する
      - タブがBならタブBを表示する
      - 状態に対して一意に定まるUIを定義しておく
      - タブBをクリックすると、状態がタブがBの状態に更新され、状態が更新されると、状態に対して一意に定まるUIが描画される
    - パフォーマンス
      - 状態が変化するたびに再描画処理が走るので、うまく実装しないと遅い
      - コンポーネントはツリー構造をとっており、あるコンポーネントの状態が更新されると配下のコンポーネントすべてが再描画の対象となる
      - DOMを毎回再描画すると遅いので、仮想DOMで描画し、実際のDOMと仮想DOMの差分を計算して差分のみを描画している
        - 差分計算自体が遅いこともあり、それを無効化することもある
        - 差分計算できるように、listなどのコンポーネントにはkeyを仕込んだりする
          - 差分計算できない場合は、すべて再描画となる
- クラスコンポーネントと関数コンポーネントのどちらを使うべきか？
  - 基本的には関数コンポーネントを使うべき、継承できるようにするはクラスコンポーネントを使う
  - 関数コンポーネントのほうが記述が楽
  - 関数コンポーネントそのものはstateless
  - どちらも機能的にできることは一緒
    - Hooksの機能がなかったころは、関数コンポーネントは微妙だったが今はHooksと組み合わせることでクラスコンポーネントと同等のことができる
- ReactはあくまでViewのみライブラリなのでそれ以外の機能を考える必要がある
  - ルーター、データフェッチ、ステート管理などのためにライブラリが必要
  - Next.jsなどのフレームワークである程度解消できる

## 参考・メモ

- [react-foundations](https://nextjs.org/learn/react-foundations)
- [React](https://react.dev/)
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

## nextjs

```
$ npm install -g pnpm
$ npx create-next-app@latest nextjs-sample1 --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
$ cd nextjs-sample1
```

```
$ pnpm run dev
npm is correct? [Yes, No, Abort, Edit]:n

> @ dev /home/owner/programming_web/react/nextjs-sample1
> next dev

 ⚠ Port 3000 is in use, trying 3001 instead.
  ▲ Next.js 15.0.0-canary.56
  - Local:        http://localhost:3001
```
