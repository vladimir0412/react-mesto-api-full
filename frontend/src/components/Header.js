import logo from '../images/logo.svg'

function Header(props) {
  return (
    <header className="header">
      <a className="header__logo-link" href="#">
        <img className="header__logo" src={logo} alt="Лого" />
      </a>
      <div className="header__group">
        {props.children}
        <button className="header__button" onClick={props.onClick}>{props.link}</button>
      </div>
    </header>
  );
}

export default Header;
