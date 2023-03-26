import React from "react";
import "./Modal.css";

const Modal = ({ children }) => {
    return <div className="modal-container">{children}</div>;
};

export default Modal;
