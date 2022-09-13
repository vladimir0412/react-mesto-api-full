import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__trash_active card__trash' : 'card__trash'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'card__like_active' : 'card__like'}`
  );

  function handleCardClick() {
    props.onCardClick(props);
  }

  function handleCardLike() {
    props.onCardLike(props);
}

  function handleCardDelete() {
    props.onCardDelete(props);
  }

  return (
    <div className="card">
      <a className="card__image-link">
        <img className="card__image" src={props.link} alt={props.name} onClick={handleCardClick} />
      </a>
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <div className="card__items">
        <h2 className="card__name">{props.name}</h2>
        <div className="card__like-group">
          <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button"></button>
          <p className="card__like-number">{props.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
