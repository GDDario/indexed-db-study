import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "@/store/slices/counterSlice";
import todoReducer from "@/store/todoSlice";

export const store = configureStore({
  reducer: todoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;