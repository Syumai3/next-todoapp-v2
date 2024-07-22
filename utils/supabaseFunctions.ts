import { supabase } from "./supabase";

export const getAllTodos = async () => {
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const addTodo = async (title: string) => {
  await supabase.from("todo").insert({ title: title });
};

export const deleteTodo = async (id: number) => {
  await supabase.from("todo").delete().eq("id", id);
};

export const editTodo = async (id: number, newTitle: string) => {
  await supabase.from("todo").update({ title: newTitle }).eq("id", id);
};

export const editStatus = async (id: number, newStatus: string) => {
  await supabase.from("todo").update({ status: newStatus }).eq("id", id);
};
