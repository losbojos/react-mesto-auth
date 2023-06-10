const validationOptions = {
    formSelector: '.form-edit',
    inputSectionSelector: '.form-edit__input-section',
    inputSelector: '.form-edit__input',
    errorSelector: '.form-edit__error',
    submitSelector: '.form-edit__button-save',

    inputInvalidClass: 'form-edit__input_invalid',
    disabledButtonClass: 'form-edit__button-save_disabled',
    inputErrorClass: 'form-edit__error_active'
}

const cardTemplateId = "card-template";
const CARDS_SERVER_URL = 'https://mesto.nomoreparties.co/v1/cohort-64';
const AUTHORIZATION_SERVER_URL = 'https://auth.nomoreparties.co';

const myToken = 'aa9e9707-2a21-4ede-81bb-dea5ef0ef1d1';
const submitButtonSelector = '.form-edit__button-save';

const REST_METHODS = { GET: 'GET', PATCH: 'PATCH', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

const PAGES = { MAIN: "/", LOGIN: "/signin", REGISTER: "/signup" };

export {
    validationOptions, cardTemplateId, CARDS_SERVER_URL as serverUrl, myToken, submitButtonSelector,
    REST_METHODS, AUTHORIZATION_SERVER_URL, PAGES
}
