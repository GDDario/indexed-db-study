import {Todo as TodoType} from "@/types";
import React from "react";

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({todo}: TodoProps) => {
    const [text, setText] = React.useState<string>(todo.text);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    return (
      <div>
        {
          isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span onClick={() => setIsEditing(true)} className="cursor-pointer">
              {todo.text}
            </span>
          )
        }
      </div>
    );
  }
;

export default Todo;