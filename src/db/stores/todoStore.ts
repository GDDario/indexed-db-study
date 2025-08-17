import {database} from "@/db";

const todoStore = () => {
  return {
    getTodos: () => {
      return database.todoList.toArray();
    }
  };
}