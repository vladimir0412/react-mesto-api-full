import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import Header from './Header';
function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const email = props.email;

  function toLinkSignout() {
    props.removeToken();
  }

  return (
    <>
      <Header
        link='Выйти'
        onClick={toLinkSignout} >
        <p className="header__email">{email}</p>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatar-group">
              <button className="profile__avatar-button" type="button" aria-label="Изменить аватар" onClick={()=>{props.onEditAvatar(true)}}>
                <div className="profile__avatar-vector"></div>
              </button>
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
            </div>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__name-text">{currentUser.name}</h1>
                <button className="profile__name-button" type="button" onClick={()=>{props.onEditProfile(true)}}></button>
              </div>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__button" type="button" onClick={()=>{props.onAddPlace(true)}}></button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card
              _id={card._id}
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              owner={card.owner}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
