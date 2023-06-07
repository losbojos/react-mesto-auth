import React, { useRef, useContext, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar } = props;

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения
    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте
    const inputRef = useRef(); // записываем объект, возвращаемый хуком, в переменную    

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        inputRef.current.value = currentUser.avatar;
    }, [currentUser, isOpen]); /* Нужно еще следить за isOpen (за состоянием открытости), 
    чтобы вставлять в инпуты данные пользователя, иначе, 
    если мы удалим информацию из инпутов и просто закроем попап, 
    то при следующем открытии инпуты будут пустые (без данных пользователя)*/

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='form-edit-avatar'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="form-edit__input-section">
                <input type="url" className="form-edit__input" placeholder="Ссылка на картинку"
                    id="profile-avatar-id" name="profile-avatar" required
                    ref={inputRef}
                />
                <span className="form-edit__error" id="profile-avatar-id-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;