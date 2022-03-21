import { createRef, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = createRef();
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setError("");
    avatar.current.value = "";
    setIsDisabled(true);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  function handleChange() {
    setError(avatar.current.validationMessage);

    // isDisabled = true если есть тест об ошибке или инпут пустой
    if (!avatar.current.value || avatar.current.validationMessage)
      setIsDisabled(true);
    else setIsDisabled(false);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
    >
      <div className="popup__input-container">
        <input
          ref={avatar}
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={avatar.current?.value}
          onChange={handleChange}
          className="popup__input popup__input_elem_link"
          required
        />
        <span className={`popup__error ${error && "popup__error_visible"}`}>
          {error}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
