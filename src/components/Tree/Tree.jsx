import React from "react";
import "./Tree.css";
import { useSelector } from "react-redux";
import Node from "../Node/Node";
import "./Tree.css";

const Tree = () => {
    const { catalogAsTree } = useSelector((state) => state.catalogReducer);

    return (
        <div>
            {catalogAsTree.map((node) => (
                <Node key={node.id} node={node}></Node>
            ))}
        </div>
    );
};

export default Tree;
