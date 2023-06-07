import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

/*
    props: {
        title: Заголовок
        name: Идентификатор формы
        buttonText: Текст кнопки подтверждения операции (Сохранить, Создать итп)
        isOpen: Открыт ли попап?
        onClose: Обработчик закрытия

        children: вложенное содержимое формы в виде JSX-разметки
    }
*/
function PopupWithForm(props) {

    const { title, name, buttonText, isOpen, onClose, onSubmit } = props;

    const classNames = `popup popup_${name} ${isOpen ? 'popup_opened' : ''}`

    usePopupClose(isOpen, onClose);

    return (

        <div className={classNames}>
            <div className="popup__container">
                <button
                    type="reset"
                    aria-label="Закрыть без сохранения изменений"
                    className="button-close cursor-pointer"
                    onClick={onClose}
                >
                </button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="form-edit" /* noValidate */ onSubmit={onSubmit}>
                    {props.children}
                    <button type="submit" className="form-edit__button-save cursor-pointer">{buttonText || "Сохранить"}</button>
                </form>
            </div>
        </div>

    );
}

export default PopupWithForm;
