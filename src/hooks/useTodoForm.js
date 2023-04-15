import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useTodoForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [coverAnimateClass, setCoverAnimateClass] = useState("fade-in");
  const [modalAnimateClass, setModalAnimateClass] = useState("zoom-in");

  const goToTodos = () => {
    setCoverAnimateClass("fade-out");
    setModalAnimateClass("zoom-out");
    console.log("search is", search);
    navigate({ pathname: "/todos", search });
    // setTimeout(() => {
    //   navigate({ pathname: "/todos", search });
    // }, 5);
  };

  return { coverAnimateClass, modalAnimateClass, goToTodos };
};

export default useTodoForm;
