import {
  Outlet,
  useLoaderData,
  Link,
  useOutlet,
  useNavigation,
  Form,
} from "react-router-dom";
import IllustrationOne from "../assets/illustration-one";
import TodoCategory from "../components/todo-category";
import TodoProvider from "../store/todo";
import TodoCard from "../components/todo-card";
import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import useCategory from "../hooks/useCategory";
import CATEGORIES from "../constants/categories";
import {
  useFirstPrismicDocument,
  PrismicRichText,
  usePrismicDocumentByUID,
} from "@prismicio/react";

const Todos = () => {
  const { todos: loadedTodos, tags } = useLoaderData();
  const outlet = useOutlet();
  const searchRef = useRef(null);
  const submitRef = useRef(null);
  const [canSearch, setCanSearch] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDoneTodos, setShowDoneTodos] = useState(true);
  const [document] = usePrismicDocumentByUID("todos", "todo");

  const savedCategories = useMemo(() => {
    return CATEGORIES.map((category) => ({
      ...category,
      selected: tags.includes(category.type),
    }));
  }, [tags]);

  const pendingTodos = useMemo(() => {
    return loadedTodos.filter((todo) => !todo.done);
  }, [loadedTodos, showDoneTodos]);

  const { selectedTags, updateCategory, categories } =
    useCategory(savedCategories);

  const navigation = useNavigation();

  const deleteTodo = (state) => setDeleting(state);

  useEffect(() => {
    searchRef.current.value = selectedTags;
    if (canSearch) submitRef.current.click();
    if (!canSearch) setCanSearch(true);
  }, [selectedTags]);

  const searching =
    navigation.formAction &&
    new URLSearchParams(navigation.location.search).has("tags");

  const animateClass = useMemo(() => {
    return outlet ? "scale-back" : "scale-forward";
  }, [outlet]);

  const HideDoneTodoInput = ({ id = "hide-todo", classes }) => (
    <label
      htmlFor={id}
      className={`inline-flex gap-x-2 items-center cursor-pointer min-w-max ${classes}`}
    >
      <input
        type="checkbox"
        id={id}
        className=" w-4 h-4 cursor-pointer"
        checked={!showDoneTodos}
        onChange={(e) => {
          setShowDoneTodos((s) => !s);
          console.log("new state", showDoneTodos);
        }}
      />
      <div className="text-brand-gray text-sm">Hide done todos</div>
    </label>
  );

  return (
    <TodoProvider todos={loadedTodos}>
      <section
        className={`todo-layout relative transition-transform ${animateClass}`}
      >
        <div className="todo-layout__section flex justify-between">
          <div className="text-2xl text-brand-black font-semibold">Todo</div>
          <Link
            to="add-todo"
            className="text-4xl text-brand-black font-semibold cursor-pointer transition-transform hover:scale-110"
          >
            +
          </Link>
        </div>
        <Form role="search">
          <input
            type="search"
            name="tags"
            id="tags"
            placeholder="search"
            ref={searchRef}
            hidden
          />
          <button type="submit" ref={submitRef} hidden></button>
        </Form>

        <div className="todo-layout__section flex gap-7 mobile:flex-col">
          {categories.map(({ type, color, selected, id }) => (
            <TodoCategory
              type={type}
              color={color}
              key={type}
              id={id}
              selected={selected}
              onSelectCategory={updateCategory}
            />
          ))}

          <HideDoneTodoInput classes="mt-5 hidden mobile:inline-flex" />

          <div className="h-[150px] w-[150px] mt-10 hidden mobile:block">
            <IllustrationOne />
          </div>
        </div>

        <HideDoneTodoInput
          id="mobile-check"
          classes="inline-flex mobile:hidden hide-todo-input"
        />

        <div className="todo-layout__section todo-container pb-20">
          {(showDoneTodos ? loadedTodos : pendingTodos).map((todo) => (
            <TodoCard todo={todo} key={todo.title} deleteTodo={deleteTodo} />
          ))}
        </div>

        <Outlet />
      </section>

      {searching ? (
        <section className="inset-0 fixed bg-faded-black grid place-items-center text-white">
          LOADING....
        </section>
      ) : null}
      {deleting ? (
        <section className="inset-0 fixed bg-faded-black grid place-items-center text-white">
          DELETING....
        </section>
      ) : null}
    </TodoProvider>
  );
};

export default Todos;
