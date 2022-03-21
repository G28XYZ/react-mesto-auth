function ErrorPopup({ message, isOpen, onClose }) {
  function handleClose(e) {
    e.preventDefault();
    onClose("error");
  }

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <h3 className="popup__title">Ошибка!</h3>
        <p>{message}</p>
        <form name="error" className="popup__form" onSubmit={handleClose}>
          <button type="submit" className="popup__button">
            Ок
          </button>
        </form>
      </div>
    </div>
  );
}

export default ErrorPopup;
