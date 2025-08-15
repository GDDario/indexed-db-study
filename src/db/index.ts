import Dexie from "dexie";

const database = new Dexie('TodoAppDB');

database.version(1).stores({
  todoList: '++id, name, createdAt',
  todos: '++id, title, completed',
});