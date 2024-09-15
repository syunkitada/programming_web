import React from "react";

// Action types
type Inc = {
  type: "Inc";
  step: number;
};

type Dec = {
  type: "Dec";
  step: number;
};

type Reset = {
  type: "Reset";
  step: number;
};

type Action = Inc | Dec | Reset;

// Action creators
const inc: (step?: number) => Inc = (step = 1) => ({ type: "Inc", step });

const dec: (step?: number) => Dec = (step = 1) => ({ type: "Dec", step });

const reset: (value?: number) => Reset = (value = 0) => ({
  type: "Reset",
  value,
});

const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "Inc":
      return state + action.step;
    case "Dec":
      return state - action.step;
    case "Reset":
      return action.value;
  }
};

export function Counter() {
  const [count, dispatch] = React.useReducer(reducer, 0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(inc())}>+</button>
      <button onClick={() => dispatch(dec())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );

  // const [count, setCount] = React.useState(0);

  // const inc = () => {
  //   setTimeout(() => {
  //     //
  //     // setCount(count + 1)
  //     setCount((count) => count + 1);
  //   }, 2000);
  // };

  // const reset = () => {
  //   setCount(0);
  // };
  //
  // return (
  //   <div>
  //     <span>{count}</span>
  //     <button onClick={inc}>+</button>
  //     <button onClick={reset}>reset</button>
  //   </div>
  // );
}
