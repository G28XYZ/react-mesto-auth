import { useContext, useState, useEffect, useMemo } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [user, setUser] = useState(currentUser);
  const [error, setError] = useState({ name: "", about: "" });

  useEffect(() => {
    setUser(currentUser);
    setError({ name: "", about: "" });
  }, [currentUser, isOpen]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(user);
  }

  // isDisabled = true если есть текст об ошибке или инпут пустой
  const isDisabled = useMemo(
    () =>
      Object.keys(error).some((e) => error[e]) ||
      Object.keys(user).some((u) => !user[u]),
    [user]
  );

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <div className="popup__input-container">
        <input
          placeholder="Имя"
          type="text"
          name="name"
          value={user.name}
          className="popup__input popup__input_elem_name"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          required
        />
        <span
          className={`popup__error ${error.name && "popup__error_visible"}`}
        >
          {error.name}
        </span>
        <input
          placeholder="Работа"
          type="text"
          name="about"
          value={user.about}
          className="popup__input popup__input_elem_about"
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          required
        />
        <span
          className={`popup__error ${error.about && "popup__error_visible"}`}
        >
          {error.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
