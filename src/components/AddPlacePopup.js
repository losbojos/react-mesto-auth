import React, { useContext } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { useForm } from '../hooks/useForm';
import { AppContext } from '../contexts/AppContext'

function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props;

    const inputName = 'name';
    const inputLink = 'link';

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения

    const { values, handleChange, setValues } = useForm({
        [inputName]: '', // Название новой карточки
        [inputLink]: '' // Ссылка на изображение новой карточки
    });

    React.useEffect(() => {
        setValues({ [inputName]: '', [inputLink]: '' });
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
        >
            <div className="form-edit__input-section">
                <input type="text" className="form-edit__input" placeholder="Название" id="image-caption-id"
                    name={inputName} required minLength="2" maxLength="30"
                    value={values[inputName]} onChange={handleChange}
                />
                <span className="form-edit__error" id="image-caption-id-error"></span>
            </div>
            <div className="form-edit__input-section">
                <input type="url" className="form-edit__input" placeholder="Ссылка на картинку"
                    id="image-link-id" name={inputLink} required
                    value={values[inputLink]} onChange={handleChange}
                />
                <span className="form-edit__error" id="image-link-id-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;