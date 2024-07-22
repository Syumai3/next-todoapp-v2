import React from "react";

type Props = {
  title: string;
  handleSubmitTodo: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AddTask({ title, handleSubmitTodo, handleAddTodoInput }: Props) {
  return (
    <form className="mb-4 mt-3">
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 "
        value={title}
        onChange={handleAddTodoInput}
      />
      <button
        onClick={handleSubmitTodo}
        className="w-full px-4 py-2 text-white bg-blue-500 transform hover:bg-blue-300 hover:scale-95 duration-200 rounded"
      >
        追加
      </button>
    </form>
  );
}

export default AddTask;
