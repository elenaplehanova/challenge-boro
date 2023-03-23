import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillCatalog, resetCatalog, markDeletedCards } from "../../store/reducers/CatalogSlice";
import { resetDeletedCards } from "../../store/reducers/DeletedCardsSlice";
import Card from "../Card/Card";
import ApiService from "../../services/api.service";
import Loader from "../Loader/Loader";
import "./CardGallery.css";

const CardGallery = () => {
    const dispatch = useDispatch();
    const { catalog } = useSelector((state) => state.catalogReducer);
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let canceled = true;
        setIsLoading(true);
        ApiService.getCards().then((data) => {
            canceled && dispatch(fillCatalog({ catalog: [...data.slice(0, 15)] }));

            if (deletedCards.length) {
                dispatch(markDeletedCards({ deletedCards }));
            }

            setIsLoading(false);
        });

        return () => (canceled = false);
    }, []);

    function reset() {
        dispatch(resetCatalog());
        dispatch(resetDeletedCards());
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
            <div className="card-container">
                {catalog &&
                    catalog.map((item) => {
                        return !item.deleted && <Card key={item.image} card={item}></Card>;
                    })}
            </div>
        </main>
    );
};

export default CardGallery;
