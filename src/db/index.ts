import Dexie, {EntityTable} from "dexie";
import {Todo, TodoList} from "@/types";

const database = new Dexie('TodoAppDB') as Dexie & {
  todoList: EntityTable<
    TodoList,
    'id'
  >;
  todo: EntityTable<
    Todo & { todoListId: string },
    'id'
  >;
};

database.version(1).stores({
  todoList: '++id, name, createdAt',
  todo: '++id, text, completed, todoListId',
});

export {database};