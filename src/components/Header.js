import React from 'react';
import imageHeaderLogo from '../images/logo/header__logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={imageHeaderLogo} alt="Логотоп" />
        </header>

    );
}

export default Header;

