function ConfirmDeletePopup({ onClose, isOpen, onCardDelete }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <h3 className="popup__title">Вы уверены?</h3>
        <form name="delete" className="popup__form" onSubmit={onCardDelete}>
          <button type="submit" className="popup__button">
            Да
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;
