import React, {useEffect, useRef} from "react";
import {MdOutlineCancel} from "react-icons/md";
import {FaRegCircleCheck} from "react-icons/fa6";

type CreatingTodoProps = {
  onCancel: () => void;
  onCreate: (text: string) => void;
};

const CreatingTodo: React.FC<CreatingTodoProps> = ({onCancel, onCreate}: CreatingTodoProps) => {
    const [text, setText] = React.useState<string>("");
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        (inputRef.current as HTMLInputElement).focus();
      }
    }, [inputRef]);

    const handleCancel = () => {
      setText("");
      onCancel();
    }

    const handleCreate = () => {
      onCreate(text);
      setText("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleCreate();
        return;
      }
    }

    return (
      <div className="flex gap-1 items-center justify-between">
        <input
          ref={inputRef}
          className="border border-gray-300 rounded py-1 px-2 w-full"
          type="text"
          placeholder="Enter todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex gap-1 items-center">
          <MdOutlineCancel
            className="cursor-pointer text-gray-400 hover:text-gray-100"
            size={19}
            title="Cancel"
            onClick={handleCancel}
          />
          <FaRegCircleCheck
            className="cursor-pointer text-gray-400 hover:text-gray-100"
            size={16}
            title="Save"
            onClick={handleCreate}
          />
        </div>
      </div>
    );
  }
;

export default CreatingTodo;