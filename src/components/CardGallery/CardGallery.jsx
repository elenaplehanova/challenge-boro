import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCatalog, markDeletedCards } from "../../store/reducers/CatalogSlice";
import { resetDeletedCards } from "../../store/reducers/DeletedCardsSlice";
import Pagination from "../Pagination/Pagination";
import Sorting from "../Sorting/Sorting";
import "./CardGallery.css";
import CardSet from "../CardSet/CardSet";

const CardGallery = () => {
    const dispatch = useDispatch();
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);

    useEffect(() => {
        if (deletedCards.length) {
            dispatch(markDeletedCards({ deletedCards }));
        }
    }, []);

    const reset = () => {
        dispatch(resetCatalog());
        dispatch(resetDeletedCards());
    };

    return (
        <div>
            <button className="button-reset" onClick={() => reset()}>
                Reset deleted cards
            </button>
            <Sorting></Sorting>
            <Pagination></Pagination>
            <CardSet></CardSet>
        </div>
    );
};

export default CardGallery;
