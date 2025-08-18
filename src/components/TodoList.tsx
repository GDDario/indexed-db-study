import {Todo as TodoType, TodoList as TodoListType} from "@/types";
import React, {useRef, useState} from "react";
import Todo from "@/components/Todo";
import {CiEdit} from "react-icons/ci";
import {MdOutlineCancel, MdOutlineDelete} from "react-icons/md";
import {FaRegCircleCheck} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {addTodo, removeTodoList, updateTodoListName} from "@/store/todoSlice";
import CreatingTodo from "@/components/CreatingTodo";

type TodoListProps = {
  todoList: TodoListType;
};

const TodoList: React.FC<TodoListProps> = ({todoList}: TodoListProps) => {
  const [name, setName] = useState<string>(todoList.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreatingTodo, setIsCreatingTodo] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef(null);

  const handleCancel = () => {
    setIsEditing(false);
  }

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateTodoListName({id: todoList.id, name}))
  }

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        (inputRef.current as HTMLInputElement).focus();
      }
    }, 0);
  }

  const handleDelete = async () => {
    dispatch(removeTodoList({id: todoList.id}));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
      return;
    }

  };
  const handleCreateTodo = (text: string) => {
    setIsCreatingTodo(false);
    dispatch(addTodo({
      todo: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now().toString(),
      }, todoListId: todoList.id
    }));
  }

  return (
    <article className="flex flex-col gap-4 p-4 border-2 border-black rounded bg-gray-900 w-60">
      <div className="flex gap-2 items-center justify-between flex-wrap">
        {isEditing ?
          <div className="flex gap-1 items-center">
            <input
              ref={inputRef}
              value={name}
              className="max-w-2/3"
              onKeyDown={handleKeyDown}
              onChange={(e) => setName(e.target.value)}
            />
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
              onClick={handleSave}
            />
          </div>
          :
          <>
            {todoList.name}
            <div className="flex gap-1 items-center">
              <MdOutlineDelete
                className="cursor-pointer text-gray-400 hover:text-red-400"
                size={16}
                title="Delete"
                onClick={handleDelete}
              />
              <CiEdit
                className="cursor-pointer text-gray-400 hover:text-gray-100"
                size={16}
                title="Edit"
                onClick={handleEdit}
              />
            </div>
          </>
        }
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        {
          todoList.todos.map((todo: TodoType) =>
            <Todo key={todo.id} todo={todo}/>
          )
        }
        {
          isCreatingTodo && (
            <CreatingTodo
              onCancel={() => setIsCreatingTodo(false)}
              onCreate={handleCreateTodo}
            />
          )
        }
      </div>

      <button
        className="mt-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 transition-colors cursor-pointer"
        onClick={() => setIsCreatingTodo(true)}
      >
        Create Todo
      </button>
    </article>
  );
};

export default TodoList;