export type TodoItemType = {
  key: number;
  task: string;
  completed: boolean;
};

export function TodoItem(props: TodoItemType) {
  const onDeleteButton = () => {
    console.log("debug");
  };

  return (
    <div>
      {props.task}
      <input type="checkbox" checked={props.completed} readOnly />
      <button onClick={onDeleteButton}>Delete</button>
    </div>
  );
}
