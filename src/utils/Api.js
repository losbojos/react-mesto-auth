import { serverUrl, myToken } from '../utils/Consts.js';

const methods = { get: 'GET', patch: 'PATCH', post: 'POST', put: 'PUT', delete: 'DELETE' };

const urls = { usersMe: '/users/me', avatar: '/avatar', cards: '/cards', likes: '/likes' };

class Api {
    constructor({ baseUrl, token }) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    getUserInfo() {
        return this._requestServer(urls.usersMe, methods.get);
    }

    setUserInfo({ name, about }) {
        return this._requestServer(urls.usersMe, methods.patch, { name, about });
    }

    setAvatar(link) {
        return this._requestServer(
            `${urls.usersMe}${urls.avatar}`,
            methods.patch,
            { avatar: link });
    }

    getCards() {
        return this._requestServer(urls.cards, methods.get);
    }

    addCard({ name, link }) {
        return this._requestServer(urls.cards, methods.post, { name, link });
    }

    deleteCard(id) {
        return this._requestServer(`${urls.cards}/${id}`, methods.delete);
    }

    changeLikeCardStatus(cardId, newLikeStatus) {
        return this._requestServer(`${urls.cards}/${cardId}${urls.likes}`,
            newLikeStatus ? methods.put : methods.delete);
    }

    _requestServer(urlAddition, method, bodyObject = null) {
        const myHeaders = new Headers();
        myHeaders.append("authorization", this.token);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: method,
            headers: myHeaders
        };

        if (bodyObject)
            requestOptions.body = JSON.stringify(bodyObject);

        return fetch(this.baseUrl + urlAddition, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${response.status}`);
            });
    }
}

const apiInstance = new Api({
    baseUrl: serverUrl,
    token: myToken
});

export default apiInstance;
