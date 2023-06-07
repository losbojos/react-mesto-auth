import React, { Fragment, useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'
import errorHandler from '../utils/ErrorHandler';
import apiInstance from '../utils/Api.js';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import { checkLiked } from '../components/Card';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from '../components/ConfirmationPopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Открыт попап редактирования профиля?
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Открыт попап добавления карточки?
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Открыт попап редактирования аватара?
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false); // Открыт попап подтверждения операции?
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // Открыт попап расширенного изображения карточки?
  const [selectedCard, setSelectedCard] = useState(null); // Развернутая карточка

  // Текущий пользователь, по умолчанию заполним некоторыми данными, чтобы меньше проверок делать далее
  const [currentUser, setCurrentUser] = useState({
    _id: -1, // Идентификатор пользователя
    name: '', // Имя пользователя
    about: '', // О пользователе
    avatar: '' // Аватар
  });

  useEffect(() => {
    apiInstance.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(error => errorHandler(error));
  }
    , [] // Пустой массив = Эффект не зависит ни от чего = выполняется 1 раз при монтировании
  );

  const [cards, setCards] = useState([]); // Карточки мест

  useEffect(() => {
    if (!currentUser || currentUser._id === -1)
      setCards([]); // Пока не залогинились - пустой набор карточек
    else
      apiInstance.getCards()
        .then(result => {
          setCards(result);
        })
        .catch(error => errorHandler(error));
  }
    , [currentUser] // Запрашиваем карточки после логина пользователя
  );

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function onEditProfileInfo() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onAddCard() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // Состояние ожидания ответа от сервера
  const [isLoading, setIsLoading] = React.useState(false);

  // Универсальная функция, которая принимает функцию запроса
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      .catch(error => errorHandler(error))
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {

    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    function makeRequest() {
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return apiInstance.setUserInfo({ name, about })
        .then(userData => setCurrentUser(userData));
    }

    // вызываем универсальную функцию, передавая в нее запрос
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {

    function makeRequest() {
      return apiInstance.setAvatar(avatar)
        .then(userData => setCurrentUser(userData));
    }

    handleSubmit(makeRequest);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = checkLiked(card, currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiInstance.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => errorHandler(error));
  }

  // Объект-параметр для передачи в окно подтверждения операции
  const [handleConfirmationParam, setHandleConfirmationParam] = useState(null);

  function handleCardDeleteConfirmation(deletingCard) {
    setHandleConfirmationParam(deletingCard);
    setIsConfirmationPopupOpen(true);
  }

  function handleCardDelete(deletingCard) {
    function makeRequest() {
      return apiInstance.deleteCard(deletingCard._id)
        .then(() => {
          setCards(cards.filter(iCard => iCard._id !== deletingCard._id));
        });
    }

    handleSubmit(makeRequest);
    setHandleConfirmationParam(null);
  }

  function handleAddPlace({ name, link }) {

    function makeRequest() {
      return apiInstance.addCard({ name, link })
        .then(newCard => setCards([newCard, ...cards]));
    }

    handleSubmit(makeRequest);
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Fragment>
          <Header />
          <Main
            onEditProfile={onEditProfileInfo}
            onAddPlace={onAddCard}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteConfirmation}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            onConfirmParam={handleConfirmationParam}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

        </Fragment>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
