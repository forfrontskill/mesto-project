import { initValidationSubmitButton } from './validate.js';
import { openPopup, closePopup, showLoading, hideLoading } from './modal.js';
import { fetchGetCards, fetchAddCard, fetchDeleteCard, fetchGetUser, fetchLikeCard, fetchDislikeCard } from './api.js';

const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docElementsContainer = docContent.querySelector('.elements');
const docCardPopup = docPage.querySelector('#popup-card');
const docCardImagePopup = docPage.querySelector('#popup-card-image');
const docPopupCardImage = docCardImagePopup.querySelector('.popup__image');
const docPopupCardImageDescription = docCardImagePopup.querySelector('.popup__image-description');

const cardTemplate = document.querySelector('#card-template').content;

const formCard = docCardPopup.querySelector('.form-popup');
formCard.addEventListener('submit', saveCardEvent);

let userId = '';

export const uploadCards = () => {

    fetchGetUser()
        .then(({ _id }) => {
            userId = _id;
        }).then(() => {
            fetchGetCards()
                .then(cards => {
                    cards.forEach(({ _id, name, link, likes }) => {
                        const { likeCount, isUserLiked } = likeInfo(likes);
                        const createdCard = createCardElement({ cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount });
                        addCardIntoPage(createdCard);
                    })
                })
        })
        .catch((error => console.log(error)));



}

const createCardElement = ({ cardId, name, link, imageDescription, favorite, likeCount }) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const updatedCard = updateCard(card, { cardId, name, link, imageDescription, favorite, likeCount });

    const button = updatedCard.querySelector('.element__button-like');
    button.addEventListener('click', toggleCardToFavorite, false);

    return card;
}

const addCardIntoPage = (card) => {
    subscribeDeleteCardButton(card);
    subscribeCardImagePopupOpen(card);
    docElementsContainer.prepend(card);
}

const toggleCardToFavorite = (event) => {
    const card = event.target.closest('.element');

    if (event.currentTarget.classList.contains('element__button-like_active')) {
        fetchDislikeCard(card.cardId)
            .then(({ _id, name, link, likes }) => {
                const { likeCount, isUserLiked } = likeInfo(likes);
                updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount });
            })
    } else {
        fetchLikeCard(card.cardId)
            .then(({ _id, name, link, likes }) => {
                const { likeCount, isUserLiked } = likeInfo(likes);
                updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount });
            })
    }
}

const likeInfo = (likes) => {
    const likeCount = likes.length;
    const isUserLiked = likes.some(like => like._id === userId);
    return { likeCount, isUserLiked };
}

const updateCard = (card, { cardId, name, link, imageDescription, favorite, likeCount }) => {
    card.cardId = cardId;
    const cardImage = card.querySelector('.element__image');
    cardImage.src = link;
    cardImage.alt = imageDescription;


    card.querySelector('.element__name').textContent = name;

    if (favorite) {
        card.querySelector('.element__button-like').classList.add('element__button-like_active');
    } else {
        card.querySelector('.element__button-like').classList.remove('element__button-like_active');
    }
    const likes = card.querySelector('.element__count-like');
    likes.textContent = likeCount;

    return card;
};

function saveCardEvent(event) {
    event.preventDefault();
    showLoading(docCardPopup);
    const fields = Object.fromEntries(new FormData(event.target));

    const cardName = fields['card-name'];
    const cardImageLink = fields['card-image-link'];

    const card = {
        name: cardName,
        link: cardImageLink,
        imageDescription: cardName,
        favorite: false,
    }

    fetchAddCard({ name: cardName, link: cardImageLink })
        .then(({ _id,name, link }) => {
            const cardElement = createCardElement({cardId: _id, name, link, imageDescription: name, favorite: false, likeCount:0 });

            addCardIntoPage(cardElement);
        })
        .catch((error => console.log(error)))
        .finally(() => {
            event.target.reset();
            closePopup(docCardPopup);
            hideLoading(docCardPopup);
        });
}

const openCardImagePopup = (event) => {
    const imageElement = event.target;

    docPopupCardImage.src = imageElement.src;
    docPopupCardImage.alt = imageElement.alt;

    docPopupCardImageDescription.textContent = imageElement.alt;

    openPopup(docCardImagePopup);
}

const deleteCard = (event) => {
    const card = event.target.closest('.element');
    console.log(card.cardId);
    fetchDeleteCard(card.cardId)
        .then((res) => {
            card.remove();
        })
        .catch((error => console.log(error)))
}


const subscribeCardImagePopupOpen = (cardElement) => {
    const image = cardElement.querySelector('.element__image');
    image.addEventListener('click', openCardImagePopup);
}

const subscribeDeleteCardButton = (cardElement) => {
    const deleteButton = cardElement.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', deleteCard);
}

const addCardButton = docPage.querySelector('.profile__button-add');
addCardButton.addEventListener('click', () => {
    openPopup(docCardPopup);
    initValidationSubmitButton(formCard);
});