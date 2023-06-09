import React from 'react';
import { useForm } from '../hooks/useForm';

function Login({ handleLogin }) {

    const { values, handleChange, setValues } = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(values);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Вход</h1>
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
            <button type="submit" className="login__submit cursor-pointer">Войти</button>
        </form>
    );
}

export default Login;