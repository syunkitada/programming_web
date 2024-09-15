import React from "react";

export type TodoFormType = {
  appendTodo: Function;
};

export function TodoForm(props: TodoFormType) {
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.currentTarget.value);
  };

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
        <input type="text" onChange={handleChange} value={text} />
      </form>
    </>
  );
}
