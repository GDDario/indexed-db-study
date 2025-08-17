import {database} from "@/db";
import {TodoList} from "@/types";

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
        await database.todoList.put({...todoList});
      });
    },
    delete: async (id: string) => {
      await database.transaction("rw", database.todoList, async () => {
        await database.todoList.delete(id);
      });
    },
  };
}

export default todoListStore;