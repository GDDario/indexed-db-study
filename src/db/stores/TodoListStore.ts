import {database} from "@/db";
import {TodoList} from "@/types";

const todoListStore = () => {
  return {
    getAll: async (): Promise<TodoList[]> => {
      const todoLists = await database.todoList.toArray();
      return Promise.all(
        todoLists.map(async (todoList) => {
          const todos = await database.todo.where("todoListId").equals(todoList.id).toArray();
          return {
            ...todoList,
            createdAt: todoList.createdAt instanceof Date ? todoList.createdAt.toISOString() : todoList.createdAt,
            todos: todos.map((todo) => ({
              ...todo,
              createdAt: todo.createdAt instanceof Date ? todo.createdAt.toISOString() : todo.createdAt,
            })),
          };
        })
      );
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