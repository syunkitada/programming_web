import React from "react";

export function RefCounter() {
  const [stateCount, setStateCount] = React.useState(0);

  // useRefは再レンダリングを引き起こさない
  // currentプロパティに任意の値を設定できる
  const refCount = React.useRef(0);

  const handleClickStateCount = () => {
    setStateCount((v) => v + 1);
  };

  const handleClickRefCount = () => {
    refCount.current++;
  };

  return (
    <div>
      <div>State Counter</div>
      <div>
        <span>{stateCount}</span>
        <button onClick={handleClickStateCount}>+</button>
      </div>
      <div>Ref Counter</div>
      <div>
        <span>{refCount.current}</span>
        <button onClick={handleClickRefCount}>+</button>
      </div>
    </div>
  );
}
