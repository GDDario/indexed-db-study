import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {addTodoList} from "@/store/todoSlice";

const Footer: React.FC = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodoList = () => {
    if (!name.trim()) {
      alert("Please enter a name for the todo list.");

      return;
    }

    dispatch(addTodoList({
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    }))
    setName("");
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodoList();
      return;
    }

    setName((e.currentTarget as HTMLInputElement).value);
  };

  return (
    <footer
      className="flex justify-center gap-2 h-16 w-full"
    >
      <input
        type="text"
        className="px-2 py-4 border border-black rounded bg-gray-950 text-xl max-w-[700px] h-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="border border-black w-16 h-16 rounded bg-gray-950 hover:bg-gray-900 transition-colors duration-200 cursor-pointer text-3xl"
        title="Add Todo List"
        onClick={handleAddTodoList}
      >
        +
      </button>
    </footer>
  );
};

export default Footer;