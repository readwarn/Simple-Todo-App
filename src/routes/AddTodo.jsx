import TodoForm from "../components/todo-form";
import ModalCover from "../components/modal-cover";
import useTodoForm from "../hooks/useTodoForm";
import useCategory from "../hooks/useCategory";
import CATEGORIES from "../constants/categories";

const AddTodo = () => {
  const { goToTodos, coverAnimateClass, modalAnimateClass } = useTodoForm();
  const { categories, updateCategory, selectedTags } = useCategory(CATEGORIES);

  return (
    <ModalCover onOutsideClick={goToTodos} classes={coverAnimateClass}>
      <TodoForm
        onCancel={goToTodos}
        classes={modalAnimateClass}
        categories={categories}
        updateCategory={updateCategory}
        selectedTags={selectedTags}
      />
    </ModalCover>
  );
};

export default AddTodo;
