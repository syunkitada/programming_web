import React from "react";

export type TodoFormType = {
  appendTodo: Function;
};

export function TodoForm(props: TodoFormType) {
  const [text, setText] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (text != "") {
      console.log("DEBUG submit");
      props.appendTodo(text);
      setText("");
    } else {
      console.log("ignored");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} defaultValue="" />
      </form>
    </>
  );
}
