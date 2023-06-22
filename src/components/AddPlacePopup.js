import React, { useContext } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { AppContext } from '../contexts/AppContext'
import useFormAndValidation from '../hooks/useFormAndValidation';
import { validationOptions } from '../utils/Consts.js'


function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props;

    const inputName = 'name'; // Имя инпута с названием новой карточки
    const inputLink = 'link'; // Имя инпута с ссылкой на изображение новой карточки

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='form-add-card'
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <div className="form-edit__input-section">
                <input
                    type="text" placeholder="Название"
                    name={inputName} id="image-caption-id"
                    value={values[inputName] || ""} onChange={handleChange}
                    required minLength="2" maxLength="30"
                    className={`form-edit__input ${errors[inputName] && validationOptions.inputInvalidClass}`}
                />
                <span className={`form-edit__error ${!isValid && validationOptions.inputErrorClass}`} id="image-caption-id-error">
                    {errors[inputName]}
                </span>

            </div>
            <div className="form-edit__input-section">
                <input
                    type="url" placeholder="Ссылка на картинку"
                    name={inputLink} id="image-link-id"
                    value={values[inputLink] || ""} onChange={handleChange}
                    required
                    className={`form-edit__input ${errors[inputLink] && validationOptions.inputInvalidClass}`}
                />
                <span className={`form-edit__error ${!isValid && validationOptions.inputErrorClass}`} id="image-link-id-error">
                    {errors[inputLink]}
                </span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;