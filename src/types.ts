export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoList = {
  id: string;
  name: string;
  todos: Todo[];
  createdAt: Date;
};