import React from "react";
import { TodoItem, TodoItemType } from "./TodoItem";

export function TodoList() {
  const [todoList, setTodoList] = React.useState([
    { id: 0, task: "task1", completed: true },
    { id: 1, task: "task2", completed: true },
  ]);

  const [text, setText] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text != "") {
      console.log("DEBUG submit");
      setTodoList(
        todoList.concat([
          {
            id: todoList.length - 1,
            task: text,
            completed: false,
          },
        ]),
      );
      setText("");
    } else {
      console.log("ignored");
    }
  };

  const handleChange = (event) => {
    setText(event.currentTarget.value);
  };

  return (
    <>
      <div>
        {todoList.map((n) => (
          <TodoItem key={n.id} {...n} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={text} />
      </form>
    </>
  );
}
