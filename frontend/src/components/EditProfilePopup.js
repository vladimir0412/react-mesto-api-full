import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name='profile'
      container='general'
      popupTitle='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit = {handleSubmit}
      textButton='Сохранить'>
      <input id="input-name" className="popup__input popup__input_type_name"
      type="text" name="name" minLength="2" maxLength="40" required
      value={name || ''} onChange={handleChangeName} />
      <span className="input-name-error popup__error"></span>
      <input id="input-career" className="popup__input popup__input_type_other"
      type="text" name="about" minLength="2" maxLength="200" required
      value={description || ''} onChange={handleChangeDescription} />
      <span className="input-career-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
