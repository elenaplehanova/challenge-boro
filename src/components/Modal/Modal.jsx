import React from "react";
import "./Modal.css";

const Modal = ({ children, handlerClick }) => {
    return (
        <div className="modal-wrapper" onClick={handlerClick}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
