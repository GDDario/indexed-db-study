import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {increment, updateValue} from "@/store/slices/counterSlice";

const Counter: React.FC = () => {
  const counterValue = useSelector((state: RootState) => state.value);
  const [value, setValue] = useState<number>(0);
  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(increment());
  }

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = event.target.value ? parseInt(event.target.value) : 0;
    setValue(value);
    dispatch(updateValue(value));
  }

  useEffect(() => {
    setValue(counterValue);
  }, [counterValue]);

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 rounded-lg px-4 py-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        onClick={handleClickButton}
      >
        Click me
      </button>

      <input
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
        type="number"
        value={value}
        onChange={changeValue}
      />

      <br/>

      {counterValue}
    </>
  );
}

export default Counter;