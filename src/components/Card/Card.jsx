import React, { useState } from "react";
import { BASE_URL } from "../../services/api.service";
import prettyBytes from "pretty-bytes";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardFromCatalog, setNewPackOfCards } from "../../store/reducers/CatalogSlice";
import { addNewDeletedCard } from "../../store/reducers/DeletedCardsSlice";
import "./Card.css";
import { setMaxPageNumber } from "../../store/reducers/PaginationSlice";

const Card = ({ card, pageNumber, numberOfCardsPerPage }) => {
    const dispatch = useDispatch();
    let date = new Date(card.timestamp);
    const { catalog } = useSelector((state) => state.catalogReducer);
    const { deletedCards } = useSelector((state) => state.deletedCardsReducer);

    const [isClose, setIsClose] = useState(false);

    function deleteCard() {
        setIsClose(true);
        setTimeout(() => {
            dispatch(addNewDeletedCard({ card }));
            dispatch(deleteCardFromCatalog({ card }));
            dispatch(
                setMaxPageNumber({
                    catalog: catalog,
                    deletedCards: deletedCards,
                })
            );

            dispatch(setNewPackOfCards({ pageNumber, numberOfCardsPerPage }));
        }, 500);
    }

    return (
        <div className={`card ${isClose ? "card--close" : ""}`}>
            <button className="button-close" onClick={() => deleteCard()}></button>
            <img className="card-image" src={`${BASE_URL}/${card.image}`} alt={card.category} />
            <p className="card-text">filesize: {prettyBytes(card.filesize)}</p>
            <p className="card-text">
                date: {date.getHours()}:{date.getMinutes()}, {date.toDateString()}
            </p>
            <p className="card-text">category: {card.category}</p>
        </div>
    );
};

export default Card;
