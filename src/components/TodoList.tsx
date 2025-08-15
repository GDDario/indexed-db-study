import {TodoList as TodoListType, Todo as TodoType} from "@/types";
import React from "react";
import Todo from "@/components/Todo";

type TodoListProps = {
  todoList: TodoListType;
};

const TodoList: React.FC<TodoListProps> = ({todoList}: TodoListProps) => {
  return (
    <article>
      <h1>{todoList.name}</h1>

      <div className="mt-4">
        {
          todoList.todos.map((todo: TodoType) =>
            <Todo key={todo.id} todo={todo}/>
          )}
      </div>
    </article>
  );
};

export default TodoList;