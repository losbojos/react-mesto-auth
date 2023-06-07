import React, { useContext, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'
import { useForm } from '../hooks/useForm';

function EditProfilePopup(props) {

    const { isOpen, onClose, onUpdateUser } = props;

    const { values, handleChange, setValues } = useForm({
        name: '', // Имя пользователя 
        about: '' // Описание
    });

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения
    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setValues({ name: currentUser.name, about: currentUser.about });
    }, [currentUser, isOpen]); /* Нужно еще следить за isOpen (за состоянием открытости), 
    чтобы вставлять в инпуты данные пользователя, иначе, 
    если мы удалим информацию из инпутов и просто закроем попап, 
    то при следующем открытии инпуты будут пустые (без данных пользователя)*/

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='form-edit-profile'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div>
                <div className="form-edit__input-section">
                    <input type="text" className="form-edit__input" placeholder="Имя" id="profile-name-id"
                        name="name" required minLength="2" maxLength="40"
                        value={values.name} onChange={handleChange}
                    />
                    <span className="form-edit__error" id="profile-name-id-error"></span>
                </div>
                <div className="form-edit__input-section">
                    <input type="text" className="form-edit__input" placeholder="О себе" id="profile-about-id"
                        name="about" required minLength="2" maxLength="200"
                        value={values.about} onChange={handleChange}
                    />
                    <span className="form-edit__error" id="profile-about-id-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;