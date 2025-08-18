import {database} from "@/db";
import {Todo} from "@/types";

const todoStore = () => {
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
    add: async (todo: Todo, todoListId: string) => {
      await database.transaction("rw", database.todo, async () => {
        await database.todo.put({...todo, todoListId});
      });
    },
    delete: async (id: string) => {
      await database.transaction("rw", database.todoList, async () => {
        await database.todoList.delete(id);
      });
    },
  };
}

export default todoStore;