import { useState, useEffect } from "react";
import { getAllTodos, addTodo } from "../../../utils/supabaseFunctions";

export const useTodos = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    getTodos();
  }, []);

  const handleSubmitTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "") {
      return;
    }
    // Todoを追加する
    await addTodo(title);
    let todos = await getAllTodos();
    setTodos(todos);
    setTitle("");
  };
  return { todos, title, setTitle, setTodos, handleSubmitTodo };
};
