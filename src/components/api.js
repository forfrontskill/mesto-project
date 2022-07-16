const tokenId = '0b2a6895-6ec2-4474-a82a-666be5c4ddd6';
const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-12';
const headers = {
    authorization: tokenId,
    'Content-Type': 'application/json'
};

export const getUser = () => {
    return fetch(`${baseUrl}/users/me`, {
        headers
    })
        .then(checkResponse)
}

export const updateUser = ({ name, about }) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then(checkResponse)
}

export const getCards = () => {
    return fetch(`${baseUrl}/cards`, {
        headers
    })
        .then(checkResponse)
}

export const addCard = ({ name, link }) => {
    return fetch(`${baseUrl}/cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then(checkResponse);
}

export const deleteCard = (cardId) => {
    return fetch(`${baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers,
    })
        .then(checkResponse);
}

export const likeCard = (cardId) => {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers
    })
        .then(checkResponse);
}

export const dislikeCard = (cardId) => {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers
    })
        .then(checkResponse);
}

export const updateAvatar = (avatar) => {
    return fetch(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            avatar
        })
    })
        .then(checkResponse);
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}