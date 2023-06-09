import React from 'react';
import { useForm } from '../hooks/useForm';
import { PAGES } from '../utils/Consts';

function Register({ handleRegister }) {

    const { values, handleChange, setValues } = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Регистрация</h1>
            <div className="login__inputs">
                <input id="email" required name="email" type="email"
                    placeholder='Email'
                    value={values.email} onChange={handleChange}
                    className="login__input"
                />
                <input id="password" required name="password" type="password"
                    placeholder='Пароль' autoComplete='off'
                    value={values.password} onChange={handleChange}
                    className="login__input"
                />
            </div>
            <button type="submit" className="login__submit cursor-pointer">Зарегистрироваться</button>
            <a href={PAGES.LOGIN} className="login__link cursor-pointer">Уже зарегистрированы? Войти</a>
        </form>

    );
}

export default Register;