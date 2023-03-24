import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fillCatalog,
    resetCatalog,
    markDeletedCards,
    setNewPackOfCards,
} from "../../store/reducers/CatalogSlice";
import { resetDeletedCards } from "../../store/reducers/DeletedCardsSlice";
import { setMaxPageNumber } from "../../store/reducers/PaginationSlice";
import Card from "../Card/Card";
import ApiService from "../../services/api.service";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import "./CardGallery.css";
import Sorting from "../Sorting/Sorting";

const CardGallery = () => {
    const dispatch = useDispatch();
    const { catalog, packOfCards } = useSelector((state) => state.catalogReducer);
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);
    const { pageNumber, numberOfCardsPerPage } = useSelector((state) => state.paginationReducer);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let canceled = true;
        setIsLoading(true);
        ApiService.getCards().then((data) => {
            if (canceled) {
                dispatch(fillCatalog({ catalog: [...data.slice(0, 20)] }));

                if (deletedCards.length) {
                    dispatch(markDeletedCards({ deletedCards }));
                }

                dispatch(
                    setMaxPageNumber({
                        catalog: [...data.slice(0, 20)],
                        deletedCards: deletedCards,
                    })
                );

                setIsLoading(false);
            }
        });

        return () => (canceled = false);
    }, []);

    function reset() {
        dispatch(resetCatalog());
        dispatch(resetDeletedCards());
        dispatch(
            setMaxPageNumber({
                catalog: catalog,
                deletedCards: [],
            })
        );
        dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
    }

    if (isLoading) {
        return (
            <main className="loader-container">
                <Loader></Loader>
            </main>
        );
    }

    return (
        <main className="card-gallery-container">
            <button className="button-reset" onClick={() => reset()}>
                Reset deleted cards
            </button>
            <Sorting></Sorting>
            <Pagination></Pagination>
            <div className="card-container">
                {packOfCards &&
                    packOfCards.map((item) => {
                        return (
                            !item.deleted && (
                                <Card
                                    key={item.image}
                                    card={item}
                                    pageNumber={pageNumber}
                                    numberOfCardsPerPage={numberOfCardsPerPage}
                                ></Card>
                            )
                        );
                    })}
            </div>
        </main>
    );
};

export default CardGallery;
