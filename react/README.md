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



## 参考

- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
  - 関数コンポーネントを使う場合は閲覧必須
