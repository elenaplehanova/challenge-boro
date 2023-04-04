import React, { useState } from "react";
import "./Node.css";
import { BASE_URL } from "../../services/api.service";
import Modal from "../Modal/Modal";

const Node = ({ node }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isShowModal, setIsShowModal] = useState();

    return (
        <div className="node">
            {node.id ? (
                <div className="branch">
                    <button
                        className="branch-button"
                        onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
                    >
                        {isCollapsed ? "+" : "-"}
                    </button>
                    <p className="branch-text">{node.name}</p>
                </div>
            ) : (
                <div className="leaf">
                    <img
                        className="leaf-thumbnail"
                        src={`${BASE_URL}/${node.image}`}
                        alt={node.category}
                        onClick={() => setIsShowModal(true)}
                    />
                    {isShowModal && (
                        <Modal handlerClick={() => setIsShowModal(false)}>
                            <button
                                className="button-close"
                                onClick={() => setIsShowModal(false)}
                            ></button>
                            <img src={`${BASE_URL}/${node.image}`} alt={node.category} />
                        </Modal>
                    )}
                </div>
            )}
            {node.children && !isCollapsed && (
                <div className="node-children">
                    {node.children.map((n) => {
                        let key = n.id ? n.id : n.image;
                        return <Node key={key} node={n} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Node;
