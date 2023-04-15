import { useRouteLoaderData, useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../store/todo";
import TodoForm from "../components/todo-form";
import ModalCover from "../components/modal-cover";
import useTodoForm from "../hooks/useTodoForm";
import useCategory from "../hooks/useCategory";
import CATEGORIES from "../constants/categories";
import { useMemo } from "react";

const EditTodo = () => {
  const { todos: all_todos } = useRouteLoaderData("all-todos");
  const { todoID } = useParams();
  const { activeTodo } = useTodo();

  const { goToTodos, coverAnimateClass, modalAnimateClass } = useTodoForm();

  const active_todo =
    activeTodo && activeTodo?.id === todoID
      ? activeTodo
      : all_todos.find((todo) => todo.id === todoID);

  if (!active_todo) throw new Error("Todo not found!!!");

  const savedCategories = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        selected: active_todo.tags.includes(category.type),
      })),
    [active_todo.type]
  );

  const { categories, updateCategory, selectedTags } =
    useCategory(savedCategories);

  return (
    <ModalCover onOutsideClick={goToTodos} classes={coverAnimateClass}>
      <TodoForm
        edit
        form={active_todo}
        onCancel={goToTodos}
        classes={modalAnimateClass}
        categories={categories}
        updateCategory={updateCategory}
        selectedTags={selectedTags}
      />
    </ModalCover>
  );
};

export default EditTodo;
