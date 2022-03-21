import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

import api from "../utils/api";
import auth from "../utils/auth";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ErrorPopup from "./ErrorPopup";
import InfoToolTip from "./InfoToolTip";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { defaultUser } from "../utils/constants";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [errorPopup, setErrorPopup] = useState({ isOpen: false });
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    message: "",
  });
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoRegister, setInfoRegister] = useState(false);

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards(cards);
        })
        .catch((err) =>
          setErrorPopup({
            isOpen: true,
            message: `Ошибка получения карточек/пользователя: ${err}`,
          })
        );
    }
  }, [loggedIn]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getUser(jwt).then(({ data: { email } }) => {
        setCurrentUser({ ...currentUser, email });
        setLoggedIn(true);
      });
    }
  }

  function handleCardDelete(e) {
    e.preventDefault();
    const { id } = selectedCard;
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка удаления карточки: ${err}`,
        })
      );
    setIsDeletePopupOpen(false);
  }

  function handleConfirmDelete(id) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard({ ...selectedCard, id });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка лайка карточки: ${err}`,
        })
      );
  }

  function closeAllPopups(msg = "") {
    if (msg === "error") {
      setErrorPopup({ ...errorPopup, isOpen: false });
      return;
    }
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleCardClick(event) {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      link: event.target.src,
      name: event.target.alt,
    });
  }

  function handleAuthorization(e, data) {
    e.preventDefault();
    auth
      .authorization(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleTokenCheck();
      })
      .catch(() => setIsInfoToolTipOpen(true));
  }

  function handleRegistration(e, data, navigate) {
    e.preventDefault();
    auth
      .registration(data)
      .then(({ data: { email } }) => {
        setCurrentUser({ ...currentUser, email });
        setInfoRegister(true);
        setIsInfoToolTipOpen(true);
        navigate();
      })
      .catch(() => setIsInfoToolTipOpen(true));
  }

  function handleExitProfile() {
    localStorage.removeItem("jwt");
    setCurrentUser(defaultUser);
    setLoggedIn(false);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function onUpdateUser(user) {
    setLoading(true);
    api
      .patchProfile(user)
      .then((data) => {
        setCurrentUser({ ...currentUser, ...data });
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка изменения профиля: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  function onUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .patchAvatar(avatar)
      .then((user) => {
        setCurrentUser(...currentUser, ...user);
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка изменения аватар: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  function onUpdateCards(card) {
    setLoading(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка добавления карточки: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  const propsMain = {
    cards: cards,
    onEditProfile: onEditProfile,
    onAddPlace: onAddPlace,
    onEditAvatar: onEditAvatar,
    onCardClick: handleCardClick,
    onCardLike: handleCardLike,
    onConfirmDelete: handleConfirmDelete,
    loggedIn: loggedIn,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          <Header loggedIn={loggedIn} onExitProfile={handleExitProfile} />

          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
            <Route exact path="/" element={<ProtectedRoute Component={Main} {...propsMain} />} />
            <Route
              path="/sign-in"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login onSubmit={handleAuthorization} loggedIn={loggedIn} />
                )
              }
            />
            <Route
              path="/sign-up"
              element={loggedIn ? <Navigate to="/" /> : <Register onSubmit={handleRegistration} />}
            />
          </Routes>
        </BrowserRouter>
      </div>

      <RenderLoadingContext.Provider value={loading}>
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={onUpdateUser}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onUpdateCards={onUpdateCards}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />
      </RenderLoadingContext.Provider>

      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <ErrorPopup
        isOpen={errorPopup.isOpen}
        onClose={closeAllPopups}
        message={errorPopup.message}
      />

      <InfoToolTip isOpen={isInfoToolTipOpen} info={infoRegister} onClose={closeAllPopups} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
