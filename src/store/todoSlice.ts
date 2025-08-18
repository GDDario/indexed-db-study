import {Todo, TodoList} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";
import TodoListStore from "@/db/stores/TodoListStore";
import TodoStore from "@/db/stores/TodoStore";

type InitialStateType = {
  todoLists: TodoList[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialStateType = {
  todoLists: [
    {
      id: "1",
      name: "Default Todo List",
      createdAt: new Date().toISOString(),
      todos: [
        {
          id: "1",
          text: "Sample Todo 1",
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          text: "Sample Todo 2",
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]
    }
  ],
  status: "loading",
  error: null,
};

export const loadTodoListsDatabase = createAsyncThunk<TodoList[], void>(
  "todoList/loadFromDatabase",
  async (_, {rejectWithValue}) => {
    try {
      const todoLists = await TodoListStore().getAll();
      return todoLists;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoList = createAsyncThunk<TodoList, TodoList>(
  "todoList/addTodoList",
  async (todoList, {rejectWithValue}) => {
    try {
      await TodoListStore().add({...todoList, todos: []});
      return todoList;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodoListName: (state, action: { payload: { id: string; name: string } }) => {
      const {id, name} = action.payload;
      const todoListIndex = state.todoLists.findIndex((todoList: TodoList) => todoList.id === id);
      if (todoListIndex !== -1) {
        state.todoLists[todoListIndex].name = name;
      }
    },
    removeTodoList: (state, action: { payload: { id: string } }) => {
      const id: string = action.payload.id;

      state.todoLists = state.todoLists.filter((todoList: TodoList) => todoList.id !== id);
      TodoListStore().delete(id);
    },
    addTodo: (state, action: { payload: { todo: Todo; todoListId: string } }) => {
      const {todo, todoListId} = action.payload;
      const todoListIndex = state.todoLists.findIndex((todoList: TodoList) => todoList.id === todoListId);
      if (todoListIndex !== -1) {
        console.log('Todo being added:', todo);
        state.todoLists[todoListIndex].todos.push(todo);
        TodoStore().add(todo, todoListId);
      }
    },
    removeTodo: (state, action: { payload: { todoId: string; todoListId: string } }) => {
      const {todoId, todoListId} = action.payload;
      const todoListIndex = state.todoLists.findIndex((todoList: TodoList) => todoList.id === todoListId);
      if (todoListIndex !== -1) {
        state.todoLists[todoListIndex].todos = state.todoLists[todoListIndex].todos.filter(
          (todo: Todo) => todo.id !== todoId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodoListsDatabase.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadTodoListsDatabase.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log('Todo lists loaded:', action.payload);
        state.todoLists = action.payload;
      })
      .addCase(loadTodoListsDatabase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addTodoList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoLists.push({...action.payload, todos: []});
      })
      .addCase(addTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  },
});

export const {updateTodoListName, removeTodoList, addTodo, removeTodo} = todoSlice.actions;

export const selectTodoLists = (state: RootState): TodoList[] => state.todoLists;
export const selectStatus = (state: RootState): "idle" | "loading" | "succeeded" | "failed" => state.status;
export const selectError = (state: RootState): string | null => state.error;

export default todoSlice.reducer;