import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const userAvatar = React.useRef('');

  React.useEffect(() => {
    userAvatar.current.value = ""
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar.current.value
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      container='avatar'
      popupTitle='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textButton='Сохранить'>
      <input id="input-url-avatar" className="popup__input popup__input_type_other"
      type="url" placeholder="Ссылка на картинку" name="avatar" required
      ref={userAvatar} />
      <span className="input-url-avatar-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
