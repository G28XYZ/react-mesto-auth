import { useEffect, useMemo, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [card, setCard] = useState({ name: "", link: "" });
  const [error, setError] = useState({ name: "", link: "" });

  useEffect(() => {
    setError({ name: "", link: "" });
    setCard({ name: "", link: "" });
  }, [isOpen]);

  function handleChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards(card);
  }

  // isDisabled = true если есть текст об ошибке или инпут пустой
  const isDisabled = useMemo(
    () =>
      Object.keys(error).some((e) => error[e]) ||
      Object.keys(card).some((c) => !card[c]),
    [card]
  );

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <div className="popup__input-container">
        <input
          placeholder="Название"
          type="text"
          name="name"
          value={card.name}
          required
          className="popup__input popup__input_elem_name"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
        />
        <span
          className={`popup__error ${error.name && "popup__error_visible"}`}
        >
          {error.name}
        </span>
        <input
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={card.link}
          required
          className="popup__input popup__input_elem_link"
          onChange={handleChange}
        />
        <span
          className={`popup__error ${error.link && "popup__error_visible"}`}
        >
          {error.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
