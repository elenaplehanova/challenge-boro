import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCatalog, markDeletedCards } from "../../store/reducers/CatalogSlice";
import { resetDeletedCards } from "../../store/reducers/DeletedCardsSlice";
import Sorting from "../Sorting/Sorting";
import "./CardGallery.css";
import CardSet from "../CardSet/CardSet";
import { setPageNumber } from "../../store/reducers/PaginationSlice";
import { Pagination } from "@mui/material";

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
    const { pageNumber, maxPageNumber } = useSelector((state) => state.paginationReducer);

    return (
        <div>
            <button className="button-reset" onClick={() => reset()}>
                Reset deleted cards
            </button>
            <Sorting></Sorting>
            <Pagination
                className="pagination"
                page={pageNumber}
                count={maxPageNumber}
                onChange={(event, page) => dispatch(setPageNumber({ pageNumber: page }))}
            />
            <CardSet></CardSet>
        </div>
    );
};

export default CardGallery;
