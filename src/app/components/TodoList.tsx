import { TodoProps } from "@/app/types/Todo";
import React, { useState } from "react";
import {
  deleteTodo,
  editStatus,
  editTodo,
  getAllTodos,
} from "../../../utils/supabaseFunctions";

type Props = {
  todos: TodoProps[];
  setTodos: React.Dispatch<any>;
};

function TodoList({ todos, setTodos }: Props) {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const todos = await getAllTodos();
    setTodos(todos);
  };

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleEdit = async (id: number) => {
    await editTodo(id, editingTitle);
    const todos = await getAllTodos();
    setTodos(todos);
    setIsEditing(null);
  };

  const handleStatusChange = async (
    id: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    await editStatus(id, newStatus);
    const todos = await getAllTodos();
    setTodos(todos);
  };

  return (
    <ul className="space-y-3">
      {todos.map(({ id, title, status }) => (
        <li
          key={id}
          className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
        >
          {isEditing === id ? (
            <>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 "
                value={editingTitle}
                onChange={handleEditInput}
              />
              <button
                className="text-green-500 mr-2"
                onClick={() => handleEdit(id)}
              >
                完了
              </button>
              <button
                className="text-red-500"
                onClick={() => setIsEditing(null)}
              >
                キャンセル
              </button>
            </>
          ) : (
            <>
              <div>
                <div className="flex flex-col items-center">
                  <span>{title}</span>
                </div>
              </div>
              <div>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(id, e)}
                >
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>
                <div>
                  <button
                    className="text-green-500 mr-2"
                    // 選択したTodoのタイトルを、titleで初期化する
                    onClick={() => {
                      setIsEditing(id);
                      setEditingTitle(title);
                    }}
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(id)}
                    className="text-red-500"
                  >
                    削除
                  </button>
                </div>{" "}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
