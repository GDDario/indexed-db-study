import Dexie, {EntityTable} from "dexie";
import {TodoList} from "@/types";

const database = new Dexie('TodoAppDB') as Dexie & {
  todoList: EntityTable<
    TodoList,
    'id'
  >;
};

database.version(1).stores({
  todoList: '++id, name, createdAt',
  todos: '++id, title, completed',
});

export {database};