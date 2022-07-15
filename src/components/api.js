const tokenId = '0b2a6895-6ec2-4474-a82a-666be5c4ddd6';
const baseUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-12';
const headers = {
    authorization: tokenId,
    'Content-Type': 'application/json'
};

export const fetchGetUser = () => {
    return fetch(`${baseUrl}/users/me`, {
        headers
    })
        .then(checkResponse)
}

export const fetchUpdateUser = ({ name, about }) => {
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

export const fetchGetCards = () => {
    return fetch(`${baseUrl}/cards`, {
        headers
    })
        .then(checkResponse)
}

export const fetchAddCard = ({ name, link }) => {
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

export const fetchDeleteCard = (cardId) => {
    return fetch(`${baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers,
    })
        .then(checkResponse);
}

export const fetchLikeCard = (cardId) => {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers
    })
        .then(checkResponse);
}

export const fetchDislikeCard = (cardId) => {
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers
    })
        .then(checkResponse);
}

export const fetchUpdateAvatar = (avatar) => {
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