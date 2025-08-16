import {Todo, TodoList} from "@/types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

type InitialStateType = {
  todoLists: TodoList[];
};

const initialState: InitialStateType = {
  todoLists: [
    {
      id: crypto.randomUUID(),
      name: "First todo list",
      createdAt: new Date().toISOString(),
      todos: []
    },
    {
      id: crypto.randomUUID(),
      name: "Second todo list",
      createdAt: new Date().toISOString(),
      todos: []
    },
  ],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoList: (state, action) => {
      const todoList: TodoList = action.payload;

      state.todoLists.push({...todoList, todos: []});
    },
    updateTodoListName: (state, action) => {
      const {id, name} = action.payload;

      const todoListIndex = state.todoLists.findIndex((todoList: TodoList) => todoList.id === id);

      if (todoListIndex !== -1) {
        state.todoLists[todoListIndex].name = name;
      }
    },
    removeTodoList: (state, action) => {
      state.todoLists = state.todoLists.filter((todoList: TodoList) => todoList.id !== action.payload.id);
    },
    addTodo: (state, action) => {
      const {todo, todoListId} = action.payload;

      const todoListIndex: number = state.todoLists.findIndex((todoList: TodoList) => todoList.id === todoListId);

      if (todoListIndex != -1) {
        state.todoLists[todoListIndex].todos.push(todo);
      }
    },
    removeTodo: (state, action) => {
      const {todoId, todoListId} = action.payload;

      const todoListIndex: number = state.todoLists.findIndex((todoList: TodoList) => todoList.id === todoListId);

      if (todoListIndex != -1) {
        state.todoLists[todoListIndex].todos = state.todoLists[todoListIndex].todos.filter((todo: Todo) => todo.id !== todoId);
      }
    }
  }
});

export const {addTodoList, updateTodoListName} = todoSlice.actions;

export const selectTodoLists = (state: RootState) => state.todoLists;
// export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;