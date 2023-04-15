import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import TodoCategory from "./todo-category";

const TodoForm = ({
  form,
  edit = false,
  onCancel,
  actionRoute = "",
  categories,
  updateCategory,
  classes,
  selectedTags,
}) => {
  const { Form, state } = useFetcher();

  const isSubmitting = useMemo(() => state === "submitting", [state]);

  const { search } = useLocation();

  const [title, setTitle] = useState(form?.title);
  const [description, setDescription] = useState(form?.description);

  const isDisabled = useMemo(
    () => !title || !description || !selectedTags,
    [title, description, selectedTags]
  );

  const ctaTitle = useMemo(
    () =>
      edit
        ? isSubmitting
          ? "Saving.."
          : "Save"
        : isSubmitting
        ? "Adding..."
        : "Add",
    [isSubmitting]
  );

  const centerClasses =
    "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2";

  return (
    <Form
      method="POST"
      action={actionRoute + search}
      className={`${centerClasses} ${classes} shadow-md w-[500px] max-w-[95%] px-4 mobile:px-8 py-4 bg-white rounded-lg`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-xl font-semibold mb-5 text-brand-black">
        {edit ? "Edit Todo" : "Add Todo"}
      </div>

      <div className="grid gap-y-1 mb-8">
        <label
          htmlFor="todo-title"
          className="text-md font-semibold text-brand-black"
        >
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="add a title"
          className="border-0 bg-slate-100 py-2 px-4 rounded-md"
          defaultValue={form?.title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid gap-y-1 mb-8">
        <label
          htmlFor="description"
          className="text-md font-semibold text-brand-black"
        >
          Description
        </label>
        <textarea
          name="description"
          rows="5"
          placeholder="add a description"
          id="desc"
          className="bg-slate-100 py-2 px-4 rounded-md"
          defaultValue={form?.description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-y-1">
        <label
          htmlFor="tags"
          className="text-md font-semibold text-brand-black"
        >
          Tags
        </label>

        <div className="flex gap-x-4 category-wrapper">
          {categories.map(({ type, color, selected, id }) => (
            <TodoCategory
              type={type}
              color={color}
              selected={selected}
              onSelectCategory={updateCategory}
              id={id}
              key={type}
            />
          ))}
        </div>
      </div>

      <input type="hidden" name="done" defaultValue={form?.done || false} />
      <input type="hidden" name="tags" defaultValue={selectedTags} />

      <div className="flex justify-end gap-x-6 mt-10">
        <button
          className="border-0 outline-0 text-md"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 text-sm rounded-md bg-brand-black text-white disabled:bg-zinc-500 disabled:cursor-not-allowed disabled:brightness-150"
          type="submit"
          disabled={isDisabled}
        >
          {ctaTitle}
        </button>
      </div>
    </Form>
  );
};

export default TodoForm;
