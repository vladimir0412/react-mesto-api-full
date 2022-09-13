import React, { useEffect } from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';
import sign from '../images/Sign.png'
import sign_error from '../images/Sign_error.png'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSuccessfulPopupOpen, setIsSuccessfulPopupOpen] = React.useState(false);
  const [popupSign, setPopupSign] = React.useState('');
  const [popupText, setPopupText] = React.useState('');
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn === true) {
      api.getProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error)=>{
        console.log(error);
      })
      api.getCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: item.owner
          }))
        );
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsSuccessfulPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card, card._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      }
    )
    .catch ((error) => {
      console.log(error);
    })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      }
    )
    .catch ((error) => {
      console.log(error);
    })
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }
    )
    .catch ((error) => {
      console.log(error);
    })
  }

  function toRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if(data) {
          history.push('/sign-in');
          setIsSuccessfulPopupOpen(true);
          setPopupText('Вы успешно зарегистрировались!');
          setPopupSign(sign);
        }
      }
    )
    .catch ((error) => {
      if(error) {
      setIsSuccessfulPopupOpen(true);
      setPopupText('Что-то пошло не так! Попробуйте ещё раз.');
      setPopupSign(sign_error);
      }
      console.log(error);
    })
  }

  function toLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          setUserEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      }
    )
    .catch ((error) => {
      if(error) {
        setIsSuccessfulPopupOpen(true);
        setPopupText('Что-то пошло не так! Попробуйте ещё раз.');
        setPopupSign(sign_error);
      }
      console.log(error);
    })
  }

  function removeToken() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if(token) {
      auth.getContent(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          history.push("/");
          setUserEmail(res.data.email);
        }
      })
      .catch ((error) => {
        console.log(error);
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="main-page">
          <div className="page-container">
            <Switch>
              <ProtectedRoute
                exact={true}
                path="/"
                component={Main}
                cards={cards}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                removeToken={removeToken}
                email={userEmail}
              />
              <Route path="/sign-up">
                <Register
                  submitButton={toRegister}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  submitButton={toLogin}
                />
              </Route>
            </Switch>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}>
            </ImagePopup>
            <InfoTooltip
              name='successful'
              container='avatar'
              popupSign={popupSign}
              popupText={popupText}
              isOpen={isSuccessfulPopupOpen}
              onClose={closeAllPopups}>
            </InfoTooltip>
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
