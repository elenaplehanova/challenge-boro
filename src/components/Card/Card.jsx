import React from "react";
import "./Card.css";
import { BASE_URL } from "../../services/api.service";

const Card = ({ card }) => {
    let date = new Date(card.timestamp);

    return (
        <div className="card">
            <button className="button-close"></button>
            <img className="card-image" src={`${BASE_URL}/${card.image}`} alt={card.category} />
            <p className="card-text">filesize: {card.filesize}</p>
            <p className="card-text">
                date: {date.getHours()}:{date.getMinutes()}, {date.toDateString()}
            </p>
            <p className="card-text">category: {card.category}</p>
        </div>
    );
};

export default Card;
