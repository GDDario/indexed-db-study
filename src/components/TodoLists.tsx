import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodoListsDatabase, selectTodoLists, selectStatus, selectError } from "@/store/todoSlice";
import { TodoList as TodoListType } from "@/types";
import TodoList from "@/components/TodoList";
import { AppDispatch } from "@/store/store";

const TodoLists: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoLists = useSelector(selectTodoLists);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(loadTodoListsDatabase());
  }, [dispatch]);

  const renderContent = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "failed") {
      return <p>Error: {error}</p>;
    }

    if (todoLists.length === 0) {
      return <p>No todo lists available.</p>;
    }

    return todoLists.map((todoList: TodoListType) => (
      <TodoList key={todoList.id} todoList={todoList} />
    ));
  };

  return <div className="flex gap-4">{renderContent()}</div>;
};

export default TodoLists;