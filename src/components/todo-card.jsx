import { useEffect, useState, useRef, useCallback } from "react";
import { useFetcher } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import ActionOption from "./action-option";
import useClickOutside from "../hooks/useClickaway";

const TodoCard = ({ todo, deleteTodo }) => {
  const [showOption, setShowOption] = useState(false);

  const [isDone, setIsDone] = useState(todo.done);

  const { Form, submit } = useFetcher();

  const { getCategoryColor } = useCategory();

  const toggleOption = () => setShowOption((state) => !state);

  const optionWrapper = useRef(null);

  const closeOptions = () => setShowOption(false);

  useClickOutside(optionWrapper, closeOptions);

  useEffect(() => {
    setIsDone(todo.done);
  }, [todo.done]);

  const TodoTag = ({ color }) => (
    <div className={`w-5 h-5 rounded-full ${color}`}></div>
  );

  const DoneForm = () => {
    return (
      <Form
        action={`mark-as-done/${todo.id}`}
        method="post"
        className="flex justify-end"
      >
        <label className="input flex items-center gap-x-1 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            name="done"
            onChange={(e) => {
              setIsDone((done) => !done);
              submit(e.currentTarget.form);
            }}
            checked={isDone}
          />

          <input
            type="text"
            defaultValue={todo.id}
            name="todoID"
            className="hidden"
          />
          <div className="text-brand-black text-sm">Done</div>
        </label>
      </Form>
    );
  };

  return (
    <div className="todo-card-layout bg-brand-brown rounded-md p-5">
      <div
        className={`title text-md font-semibold ${
          isDone ? "text-slate-400" : ""
        }`}
      >
        {todo.title}
      </div>

      <div
        className="action justify-self-end text-2xl font-semibold -mt-3 cursor-pointer relative"
        ref={optionWrapper}
      >
        <span onClick={toggleOption}>...</span>
        {showOption ? (
          <ActionOption todo={todo} deleteTodo={deleteTodo} />
        ) : null}
      </div>

      <div
        className={`desc text-sm ${
          isDone ? "text-brand-gray line-through" : ""
        }`}
      >
        {todo.description}
      </div>

      <div className="tags flex item-center gap-x-2">
        {todo.tags.map((type, index) => (
          <TodoTag color={getCategoryColor(type)} key={index} />
        ))}
      </div>

      <DoneForm />
    </div>
  );
};

export default TodoCard;
