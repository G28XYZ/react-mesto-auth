import React, { useContext, useEffect, useMemo } from "react";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

function PopupWithForm({
  name,
  title,
  textButton = "Сохранить",
  isOpen,
  onClose,
  children,
  onSubmit,
  isDisabled,
}) {
  const loading = useContext(RenderLoadingContext);
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`popup__button ${
              isDisabled && "popup__button_disabled"
            }`}
            disabled={isDisabled || loading || !isOpen}
          >
            {loading ? "Сохранение..." : textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
