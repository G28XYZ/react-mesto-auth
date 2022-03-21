import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onConfirmDelete }) {
  const { _id } = useContext(CurrentUserContext);
  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some((i) => i._id === _id);
  const cardLikeButtonClassName = isLiked
    ? "place__like place__like_active"
    : "place__like";

  return (
    <article key={card._id} className="place">
      <img
        onClick={onCardClick}
        src={card.link}
        alt={card.name}
        className="place__image"
      />
      {isOwn && (
        <button
          aria-label="Удалить"
          type="button"
          className="place__delete"
          onClick={onConfirmDelete.bind(this, card._id)}
        ></button>
      )}
      <div className="place__row">
        <h2 className="place__title">{card.name}</h2>
        <div>
          <button
            aria-label="Лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={onCardLike.bind(this, card)}
          ></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
