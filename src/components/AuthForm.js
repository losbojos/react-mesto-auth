import React from 'react';
import { useForm } from '../hooks/useForm';

function AuthForm({ handleAuth, titleText, buttonSubmitText, children }) {

    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAuth(values);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">{titleText}</h1>
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
            <button type="submit" className="login__submit cursor-pointer">{buttonSubmitText}</button>
            {children}
        </form>

    );
}

export default AuthForm;