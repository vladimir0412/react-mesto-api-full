import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [cardName, setCardName] = React.useState('');
  const [cardUrl, setCardUrl] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardUrl('');
  }, [props.isOpen]);

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardUrl(e) {
    setCardUrl(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: cardName,
      link: cardUrl
    });
  }

  return (
    <PopupWithForm
      name='card'
      container='general'
      popupTitle='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textButton='Создать'>
      <input id="input-place" className="popup__input popup__input_type_name"
      type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required
      value={cardName} onChange={handleChangeCardName} />
      <span className="input-place-error popup__error"></span>
      <input id="input-url" className="popup__input popup__input_type_other"
      type="url" placeholder="Ссылка на картинку" name="link" required
      value={cardUrl} onChange={handleChangeCardUrl} />
      <span className="input-url-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
