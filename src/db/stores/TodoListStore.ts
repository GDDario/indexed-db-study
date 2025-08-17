import {database} from "@/db";
import {TodoList} from "@/types";
import Dexie from "dexie";

const todoListStore = () => {
  return {
    getAll: async () => {
      const todoLists = await database.todoList.toArray();

      return todoLists.map((todoList) => {
        return {
          ...todoList,
          todos: [],
        }
      });
    },
    add: async (todoList: TodoList) => {
      await database.transaction("rw", database.todoList, async () => {
        await database.todoList.put({ ...todoList });
      });
    },
  };
}

export default todoListStore;