import { Outlet } from "react-router-dom";
import Home from "./routes/Home";
import Todos from "./routes/Todos";
import AddTodo from "./routes/AddTodo";
import EditTodo from "./routes/EditTodo";
import Simulator from "./routes/Simulator";
import {
  todoLoader,
  addNewTodo,
  editTodo,
  deleteTodo,
  markTodoAsDone,
} from "./server/todo";
import { useRouteError } from "react-router-dom";

const PageLayout = () => (
  <section className="px-4 mobile:px-10 py-5 border-2 border-brand-gray rounded-lg min-h-screen h-screen">
    <Outlet />
  </section>
);

const ErrPage = () => {
  const error = useRouteError();
  const err =
    typeof error === "string" ? error : error?.message ? error?.message : error;
  return (
    <div className="grid gap-y-4 px-4 py-10">
      <h3 className="text-xl font-semibold text-center">
        Ooops, an error occured!!!
      </h3>

      <p className="text-md text-gray-600 text-center">{err}</p>
    </div>
  );
};

export default [
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "todos",
        element: <Todos />,
        loader: todoLoader,
        id: "all-todos",
        children: [
          {
            path: "add-todo",
            element: <AddTodo />,
            action: addNewTodo,
          },
          {
            path: "edit-todo/:todoID",
            element: <EditTodo />,
            action: editTodo,
          },
          {
            path: "delete-todo/:todoID",
            action: deleteTodo,
          },
          {
            path: "mark-as-done/:todoID",
            action: markTodoAsDone,
          },
        ],
      },
      {
        path: "simulator",
        element: <Simulator />,
      },
    ],
  },
];
