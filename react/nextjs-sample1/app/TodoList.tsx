import React from "react";
import { TodoItem, TodoItemType } from "./TodoItem";
import { TodoForm } from "./TodoForm";

export function TodoList() {
  const [todoList, setTodoList] = React.useState([
    { id: 0, task: "task1", completed: true },
    { id: 1, task: "task2", completed: true },
  ]);

  const appendTodo = (text: string) => {
    setTodoList(
      todoList.concat([
        {
          id: todoList.length - 1,
          task: text,
          completed: false,
        },
      ]),
    );
  };

  return (
    <>
      <div>
        {todoList.map((n) => (
          <TodoItem key={n.id} {...n} />
        ))}
      </div>

      <TodoForm appendTodo={appendTodo} />
    </>
  );
}
