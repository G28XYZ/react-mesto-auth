function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup_type_image ${card.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_image">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
