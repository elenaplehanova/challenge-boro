import React, { useState } from "react";
import { BASE_URL } from "../../services/api.service";
import prettyBytes from "pretty-bytes";
import { useDispatch } from "react-redux";
import { deleteCardFromCatalog } from "../../store/reducers/CatalogSlice";
import { addNewDeletedCard } from "../../store/reducers/DeletedCardsSlice";
import "./Card.css";

const Card = ({ card }) => {
    const dispatch = useDispatch();

    const [isClose, setIsClose] = useState(false);
    function deleteCard() {
        setIsClose(true);
        setTimeout(() => {
            dispatch(addNewDeletedCard({ card }));
            dispatch(deleteCardFromCatalog({ card }));
        }, 500);
    }

    let date = new Date(card.timestamp);

    return (
        <div className={`card ${isClose ? "card--close" : ""}`}>
            <button className="button-close" onClick={() => deleteCard()}></button>
            <img className="card-image" src={`${BASE_URL}/${card.image}`} alt={card.category} />
            <p className="card-text">file size: {prettyBytes(card.filesize)}</p>
            <p className="card-text">
                date: {date.getHours()}:{date.getMinutes()}, {date.toDateString()}
            </p>
            <p className="card-text">category: {card.category}</p>
        </div>
    );
};

export default Card;
