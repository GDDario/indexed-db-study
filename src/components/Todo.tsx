import {Todo as TodoType} from "@/types";
import React from "react";

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({todo}: TodoProps) => {
    return (
      <div>
        {todo.text}
      </div>
    );
  }
;

export default Todo;