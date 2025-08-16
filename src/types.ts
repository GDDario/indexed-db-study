export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

export type TodoList = {
  id: string;
  name: string;
  todos: Todo[];
  createdAt: string;
};