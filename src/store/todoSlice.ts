import {Todo, TodoList} from "@/types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

type InitialStateType = {
  todoLists: TodoList[];
};

const initialState: InitialStateType = {
  todoLists: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoList: (state, action) => {
      const todoList: TodoList = action.payload;

      state.todoLists.push(todoList);
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

export const {addTodoList} = todoSlice.actions;

export const selectTodoLists = (state: RootState) => state.todoLists;
// export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;