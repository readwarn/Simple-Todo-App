import { useTodo } from "../store/todo";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

const ActionOption = ({ todo, deleteTodo }) => {
  const { setActiveTodo } = useTodo();

  const navigate = useNavigate();
  const { search } = useLocation();

  const { Form, state } = useFetcher();

  useEffect(() => {
    deleteTodo(state === "submitting");
  }, [state]);

  const navigateToPage = (route) => {
    setActiveTodo(todo);
    navigate({ pathname: route, search });
  };

  const DeleteButton = ({ id }) => (
    <Form method="POST" action={`delete-todo/${id}`}>
      <button
        type="submit"
        className="py-2 px-4 text-sm font-normal text-left rounded-b-lg w-full h-full text-brand-black transition-colors hover:text-black hover:bg-slate-100"
      >
        Delete
      </button>
    </Form>
  );

  return (
    <div className="absolute bg-white dropdown-animation rounded-lg shadow-md border-0.5 min-w-[120px]">
      <div
        className="py-2 px-4 border-b border-brand-gray text-sm font-normal rounded-t-lg transition-colors text-brand-black hover:text-black hover:bg-slate-100"
        onClick={() => navigateToPage(`/todos/edit-todo/${todo.id}`)}
      >
        Edit
      </div>
      <DeleteButton id={todo.id} />
    </div>
  );
};

export default ActionOption;
