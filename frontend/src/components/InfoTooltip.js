function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container-${props.container}`}>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__sign" alt="Значек" src={props.popupSign}/>
        <p className="popup__text">{props.popupText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
