import {
  db,
  doc,
  collection,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "../constants/firebase-todo-app-config";

export const fetchAllTodos = async (tags) => {
  const todoRef = collection(db, "todos");

  const todoCategories = ["work", "study", "entertainment", "family"];

  const searchTags = tags?.length ? tags : todoCategories;

  const q = query(todoRef, where("tags", "array-contains-any", searchTags));

  const todos = await getDocs(q);
  let formattedTodos = [];
  todos.forEach((todo) => {
    formattedTodos.push({ id: todo.id, ...todo.data() });
  });
  return formattedTodos;
};

export const addNewTodo = async (todo) => {
  const todoRef = collection(db, "todos");
  return await addDoc(todoRef, todo);
};

export const editOldTodo = async (todoID, updatedTodo) => {
  const todoRef = doc(db, "todos", todoID);
  return await setDoc(todoRef, updatedTodo, { merge: true });
};

export const deleteTodo = async (todoID) => {
  const todoRef = doc(db, "todos", todoID);
  return await deleteDoc(todoRef);
};
