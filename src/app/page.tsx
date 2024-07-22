"use client";

import AddTask from "@/app/components/AddTask";
import TodoList from "@/app/components/TodoList";
import { useEffect, useState } from "react";
import { addTodo, getAllTodos } from "../../utils/supabaseFunctions";
import { useTodos } from "@/app/hooks/useTodos";

export default function Home() {
  const { todos, title, setTitle, setTodos, handleSubmitTodo } = useTodos();

  const handleAddTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">Todoリスト</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded">
          <AddTask
            handleSubmitTodo={handleSubmitTodo}
            handleAddTodoInput={handleAddTodoInput}
            title={title}
          />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </main>
  );
}
