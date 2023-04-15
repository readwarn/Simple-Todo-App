import {
  addNewTodo as pushNewTodo,
  fetchAllTodos,
  editOldTodo,
  deleteTodo as removeTodo,
} from "../libs/firebase";
import { redirect } from "react-router-dom";

export const todoLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("tags");
  const tags = query ? query.split("_") : [];
  const todos = await fetchAllTodos(tags);
  return { todos, tags };
};

export const markTodoAsDone = async ({ request }) => {
  const formData = await request.formData();
  const updates = {
    done: formData.get("done") === "on",
  };
  const response = await editOldTodo(formData.get("todoID"), updates);
  return response ? response : null;
};

export const addNewTodo = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const formattedTodo = {
    ...updates,
    done: false,
    tags: updates.tags.split("_"),
  };
  const response = await pushNewTodo(formattedTodo);
  return redirect("/todos");
};

export const editTodo = async ({ params, request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const url = new URL(request.url);
  const query = url.searchParams.get("tags");
 
  const formattedTodo = {
    ...updates,
    done: JSON.parse(formData.get("done")),
    tags: updates?.tags ? updates.tags.split("_"):[],
  };
  
  await editOldTodo(params.todoID, formattedTodo);
  return redirect(`/todos?tags=${query||''}`);
  // return "";
};

export const deleteTodo = async ({ params }) => {
  const response = await removeTodo(params.todoID);
  console.log("DELETE TODO", response);
  return "DELETE TODO";
};
