import React from "react";
import {useSelector} from "react-redux";
import {selectTodoLists} from "@/store/todoSlice";
import {TodoList as TodoListType} from "@/types";
import TodoList from "@/components/TodoList";
// import {useLiveQuery} from "dexie-react-hooks/src";

const TodoLists: React.FC = () => {
  const todoLists = useSelector(selectTodoLists);

  return (
    <div className="flex gap-4">
      {
        todoLists.map((todoList: TodoListType) =>
          <TodoList key={todoList.id} todoList={todoList}/>
        )
      }
    </div>
  );
};

export default TodoLists;