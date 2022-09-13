import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`+' '+(props.isOpen?'popup_opened':' ')}>
      <div className={`popup__container-${props.container}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
         <p className="popup__title">{props.popupTitle}</p>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name}
        onSubmit={props.onSubmit} >
          {props.children}
          <button className="popup__button" type="submit">{props.textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
