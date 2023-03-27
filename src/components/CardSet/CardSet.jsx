import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPageNumber } from "../../store/reducers/PaginationSlice";
import { setNewPackOfCards } from "../../store/reducers/CatalogSlice";
import "./CardSet.css";

const CardSet = () => {
    const dispatch = useDispatch();
    const { packOfCards } = useSelector((state) => state.catalogReducer);
    const { catalog } = useSelector((state) => state.catalogReducer);
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);
    const { pageNumber, numberOfCardsPerPage } = useSelector((state) => state.paginationReducer);

    useEffect(() => {
        let displayedCatalogLength = catalog.length - deletedCards.length;

        dispatch(
            setMaxPageNumber({
                length: displayedCatalogLength,
            })
        );
    }, [deletedCards]);

    useEffect(() => {
        dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
    }, [pageNumber, deletedCards, catalog]);

    return (
        <div className="card-container">
            {packOfCards &&
                packOfCards.map((item) => {
                    return !item.deleted && <Card key={item.image} card={item}></Card>;
                })}
        </div>
    );
};

export default CardSet;
