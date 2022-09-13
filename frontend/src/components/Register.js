import { Link, useHistory } from "react-router-dom";
import * as Auth from '../utils/Auth.js';
import App from "./App";
import React from "react";
import Header from "./Header.js";

function Register({ submitButton }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();


  function handleSubmit(e) {
    e.preventDefault();
    submitButton(email, password);
  }

  function handleSubmitEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmitPassword(e) {
    setPassword(e.target.value);
  }

  function toLinkLogin() {
    history.push('/sign-in');
  }

  return (
    <>
      <Header
        link='Войти'
        onClick={toLinkLogin} >
      </Header>
      <div className="start">
        <h1 className="start__title">Регистрация</h1>
        <form className="start__form" name="form" onSubmit={handleSubmit}>
          <input className="start__input" type="email" placeholder="Email" required onChange={handleSubmitEmail}/>
          <input className="start__input" type="password" placeholder="Пароль" required onChange={handleSubmitPassword}/>
          <button className="start__button" type="submit">Зарегистрироваться</button>
        </form>
        <div className="start__sign-in">
          <p className="start__question">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="start__link">Войти</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
