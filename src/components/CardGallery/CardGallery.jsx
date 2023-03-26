import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    resetCatalog,
    markDeletedCards,
    setNewPackOfCards,
} from "../../store/reducers/CatalogSlice";
import { resetDeletedCards } from "../../store/reducers/DeletedCardsSlice";
import { setMaxPageNumber } from "../../store/reducers/PaginationSlice";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Sorting from "../Sorting/Sorting";
import "./CardGallery.css";

const CardGallery = () => {
    const dispatch = useDispatch();
    const { catalog, packOfCards } = useSelector((state) => state.catalogReducer);
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);
    const { pageNumber, maxPageNumber, numberOfCardsPerPage } = useSelector(
        (state) => state.paginationReducer
    );

    useEffect(() => {
        if (deletedCards.length) {
            dispatch(markDeletedCards({ deletedCards }));
        }
    }, []);

    useEffect(() => {
        let displayedCatalogLength = catalog.length - deletedCards.length;

        dispatch(
            setMaxPageNumber({
                length: displayedCatalogLength,
            })
        );
    }, [catalog, deletedCards]);

    useEffect(() => {
        dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
    }, [pageNumber, maxPageNumber, deletedCards, catalog]);

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
            <div className="card-container">
                {packOfCards &&
                    packOfCards.map((item) => {
                        return !item.deleted && <Card key={item.image} card={item}></Card>;
                    })}
            </div>
        </div>
    );
};

export default CardGallery;
