import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageNumber } from "../../store/reducers/PaginationSlice";
import { setNewPackOfCards } from "../../store/reducers/CatalogSlice";
import "./Pagination.css";

const Pagination = () => {
    const { pageNumber, maxPageNumber, numberOfCardsPerPage } = useSelector(
        (state) => state.paginationReducer
    );
    const dispatch = useDispatch();

    function changePage(isForward) {
        dispatch(changePageNumber({ isForward: isForward }));
    }

    useEffect(() => {
        let canceled = true;
        if (canceled) {
            dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
        }

        return () => (canceled = false);
    }, [pageNumber, maxPageNumber]);

    return (
        <div className="pagination-container">
            <button
                disabled={pageNumber === 1}
                className="button-backward"
                onClick={() => changePage(false)}
            ></button>
            <p>{pageNumber}</p>
            <button
                disabled={pageNumber === maxPageNumber}
                className="button-forward"
                onClick={() => changePage(true)}
            ></button>
        </div>
    );
};

export default Pagination;
