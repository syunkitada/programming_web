import * as React from 'react';
import { useState, useEffect, useId } from 'react';


function CounterForState(props) {
  // useStateで初期値を渡すと、変数とsetterが返ってくるので適当な名前を付ける
  const [count, setCount] = useState<number>(0);
  // Reactの描画の流れは以下
  // 1. なんらかのイベントが発生
  // 2. setterによって状態が更新される
  // 3. 再描画

  // useEffectを利用すると、（再）描画されたあとに、引数でいらた関数が呼び出されます
  // componentDidMount and componentDidUpdateのように動作します
  // sideEffectと呼ぶ
  useEffect(() => {
    document.title = `You clicked ${count} times`;

    // returnで関数を返すと、クリーンアップ処理時に関数が呼び出されます
    // クリーンアップ処理とは、EventListenrの削除処理などです
    // componentWillUnmountのように動作します
    return () => {
        console.log("cleanup")
    }
  });

  // useIdによりuniqueなIDを生成できる
  const id = useId();
  const id2 = useId();

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

      <h2>test useId</h2>
      <p id={id}>id is {id}</p>
      <p id={id+"-hoge"}>id is {id+"-hoge"}</p>
      <p id={id2}>id2 is {id2}</p>
      <p id={id2+"-hoge"}>id2 is {id2+"-hoge"}</p>
    </>
  );
}

export {
    CounterForState
}
