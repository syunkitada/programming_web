# react typescript

```
create-react-app --scripts-version=react-scripts-ts react-typescript
```

## メモ

- tslint も自動で入っててコンパイル時に実行されてるみたい
- typescript では redux-actions が対応しておらず使えないので、typescript-fsa を使う
  - yarn add typescript-fsa typescript-fsa-reducers

## Errors

### Could not find a declaration file for module 'xxx'.

```
Could not find a declaration file for module 'foobar'.
Try npm install @types/foobar if it exists or add a new declaration (.d.ts) file containing declare module 'foobar';
```

```
$ yarn add @types/foobar
```

### Parameter 'xxx' implicitly has an 'any' type.

- 暗黙の any を利用すると怒られる

Property 'classes' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'

Type '{ open: boolean; onClose: (event: any, reason: any) => void; vertical: string; horizontal: string; variant: string; msg: any; }' is not assignable to type

### Type 'xxx' is not assignable to type 'yyy'.

- 型付けされた変数に別の型を代入すると

### Expected 0 arguments, but got 2.

- 関数の引数の数が合わないとエラーとなる
- 可変長引数の代用として arguments とか使って引数渡ししてると、これに怒られた
  - typescript では、以下のように可変長引数を定義できる
  - hello (...args: any[])

### for (... in ...) statements must be filtered with an if statement (forin)

- for in は、enamable なプロパティに対して反復処理を回すので、予想外の挙動をする場合があり使ってはいけない
- object のプロパティを反復処理するのに使っていたがダメ
  - 以下のように、Object.keys と for of を使うと良い
  - for (const key of Object.keys(data)) {

### Calls to 'console.error' are not allowed.

- console 使うと怒られる、以下のルールを追加して無効化できる
- "no-console": false
