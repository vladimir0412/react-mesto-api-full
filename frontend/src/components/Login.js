import React from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";

function Login({ submitButton }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setEmail('');
    setPassword('');
    submitButton(email, password);
  }

  function handleSubmitEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmitPassword(e) {
    setPassword(e.target.value);
  }

  function toLinkRegister() {
    history.push('/sign-up');
  }

  return (
    <>
      <Header
        link='Регистрация'
        onClick={toLinkRegister} >
      </Header>
      <div className="start">
        <h1 className="start__title">Вход</h1>
        <form className="start__form" name="form" onSubmit={handleSubmit}>
          <input className="start__input" type="email" placeholder="Email" required onChange={handleSubmitEmail} value={email}/>
          <input className="start__input" type="password" placeholder="Пароль" required onChange={handleSubmitPassword} value={password}/>
          <button className="start__button" type="submit">Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;
