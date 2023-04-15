import { createPortal } from "react-dom";
const modalHood = document.querySelector(".todo-app-modal-room");

const ModalCover = ({ children, onOutsideClick, classes }) => {
  const modalContainer = (
    <div
      className={`fixed inset-0 bg-faded-black ${classes}`}
      onClick={onOutsideClick}
    >
      {children}
    </div>
  );

  return children ? createPortal(modalContainer, modalHood) : null;
};

export default ModalCover;
