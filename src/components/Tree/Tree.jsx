import React, { useEffect } from "react";
import "./Tree.css";
import { useDispatch, useSelector } from "react-redux";
import { fillCatalogAsTree } from "../../store/reducers/CatalogSlice";
import Node from "../Node/Node";
import "./Tree.css";

const Tree = () => {
    const dispatch = useDispatch();
    const { catalogAsTree } = useSelector((state) => state.catalogReducer);

    useEffect(() => {
        dispatch(fillCatalogAsTree());
    }, []);

    return (
        <div>
            {catalogAsTree.map((node) => (
                <Node key={node.id} node={node}></Node>
            ))}
        </div>
    );
};

export default Tree;
