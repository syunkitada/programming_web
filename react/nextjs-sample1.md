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
- useState, useReducer, useRef
  - 関数コンポーネントそのものが状態を持つわけではない
  - Reactが管理する仮想DOMに状態が保持される
  - useState, useReducer, useRefにより仮想DOMの状態にアクセスする
  - これらによる状態はコンポーネント固有
    - コンポーネントの「ローカルステート」と呼ばれる
  - 状態としてオブジェクト（配列を含む）を使ってる場合
    - 状態の更新はミュータブルなマナーに従う（コピーして使う）
  - useState()では、「古くなったクロージャに注意」
    - 「現在の値に基づく更新」は更新関数を利用する
  - useRefで再レンダリングを伴わない状態を扱うことができる
  - 空間的なスコープ
    - useState等を呼び出したコンポーネントのみが直接参照できる
    - Propsを通じて子コンポーネントに状態を渡すことができる
      - Propsのバケツリレー
- コンポーネントと副作用
  - コンポーネントの主目的はDOM要素のレンダリング
    - それ以外のリソースを扱うことは副作用と呼ばれる
  - コンポーネント自体は副作用を持つべきではない
    - コンポーネントはレンダーフェーズで実行される
    - レンダーフェイーズは途中で破棄されて再実行されることもある
    - コンポーネントが何度実行されるかはReactのスケジューリング次第
  - コンポーネントは「べき等」であるべき
    - 繰り返し実行されても不都合がないこと
    - イベントハンドラのようにレンダーフェーズで実行されないコードは副作用を持っても構わない
  - useEffect(effectFunction, deps)
    - 作用を扱うための組み込みHook
      - コンポーネント視点では「副作用」だがuseEffect視点では「作用」
        - useEffectの主目的のため「副」作用ではないという扱い
    - 第一引数は、「作用」をセットアップする関数
      - この関数は「作用」をクリーンナップする関数を返す（省略可）
      - セットアップ関数
        - リソースと同期した状態を開始する関数
          - 例
            - タイマを設定する、イベントリスナーを登録する、ネットワークに接続する
          - 引数: なし
          - 戻り値: クリーンナップ関数
            - リソースと同期した状態を終了する関数
            - 例
              - タイマを解除する、イベントリスナーを削除する、ネットワークを切断する
            - 引数: なし
            - 戻り値: なし
    - 第二引数は作用が依存する値の配列
      - リソースと「同期」する頻度をコントロールする
      - 配列の各要素は前回のレンダリング時の対応する要素とObject.is()で比較される
      - オブジェクト（配列や関数を含む）は同一性に注意
  - useLayoutEffect(setupFunction, deps)
    - セットアップ・クリーンナップ関数をコミットフェーズで「同期的」に実行する組み込みHook
    - DOMを更新されたブラウザが画面を「ペイントする前」にセットアップ・クリーンナップ関数を実行する
      - DOM要素がペイントされる前にそのサイズや位置等を制御したい場合に使える
      - useEffect()は両方の関数を「非同期」に実行する
        - 両関数ともブラウザが画面をペイントした後に実行される
    - パフォーマンスに悪影響を与える可能性があるので可能ならuseEffectを使用すべき
- ReactはあくまでViewのみライブラリなのでそれ以外の機能を考える必要がある
  - ルーター、データフェッチ、ステート管理などのためにライブラリが必要
  - Next.jsなどのフレームワークである程度解消できる
- React Developer Tools
  - 各コンポーネントのProps/Stateを確認できる
  - 再レンダリングされたコンポーネントを可視化できる
    - レンダリングはなるべく最低限にしたほうがよい
- Memorized = React.memo(Component, compare)
  - 関数が返した結果をキャッシュして、同じ引数で呼び出された場合はキャッシュを返すことで関数の再実行を回避する
  - 第一引数はメモ化する対象のコンポーネント
  - 第二引数はPropsを比較する関数（任意）
  - 戻り値はメモ化されたコンポーネント
- cached = useMemo(calculate, deps)
  - 任意の値をキャッシュするための組み込みHook
    - 同一性のためではなく重い計算をキャッシュする用途でも使える
  - 第一引数はキャッシュされる値を計算する関数
  - 第二引数はキャッシュする値が依存する値の配列
  - 戻り値はキャッシュされた値
- cached = useCallback
  - 第一引数はキャッシュ対象の関数
  - 第二引数はキャッシュする関数が依存する値の配列
  - 戻り値はキャッシュされた関数

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
- [Recruit: React 研修(2024)](https://speakerdeck.com/recruitengineers/react-yan-xiu-2024)
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
