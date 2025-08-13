import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      ++state.value;
    },
    updateValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  }
});

export const selectValue = (state: RootState) => state.value;

export const {increment, updateValue} = counterSlice.actions;

export default counterSlice.reducer;