import { initValidationSubmitButton } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { showLoading, hideLoading } from './utils.js';
import { getCards, addCard, deleteCard, likeCard, dislikeCard } from './api.js';
import { profileInfo } from './store/store.js';

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

export const uploadCards = (cards) => {
    cards.forEach(({ _id, name, link, likes, owner }) => {
        const ownerId = owner._id;
        const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
        const createdCard = createCardElement({ cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
        addCardIntoPage(createdCard);
    })
}

const createCardElement = ({ cardId, name, link, imageDescription, favorite, likeCount, activeDelete }) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const updatedCard = updateCard(card, { cardId, name, link, imageDescription, favorite, likeCount, activeDelete });

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
        dislikeCard(card.cardId)
            .then(({ _id, name, link, likes, owner }) => {
                const ownerId = owner._id;
                const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
                updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
            })
            .catch((error => console.log(error)));
    } else {
        likeCard(card.cardId)
            .then(({ _id, name, link, likes, owner }) => {
                const ownerId = owner._id;
                const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
                updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
            })
            .catch((error => console.log(error)));
    }
}

const initCardInfo = ({ likes, ownerId }) => {
    const activeDelete = ownerId === profileInfo.id;
    const likeCount = likes.length;
    const isUserLiked = likes.some(like => like._id === profileInfo.id);
    return { likeCount, isUserLiked, activeDelete };
}

const updateCard = (card, { cardId, name, link, imageDescription, favorite, likeCount, activeDelete }) => {
    card.cardId = cardId;
    const cardImage = card.querySelector('.element__image');
    cardImage.src = link;
    cardImage.alt = imageDescription;


    card.querySelector('.element__name').textContent = name;

    const likeButton = card.querySelector('.element__button-like');
    if (favorite) {
        likeButton.classList.add('element__button-like_active');
    } else {
        likeButton.classList.remove('element__button-like_active');
    }

    const deleteButton = card.querySelector('.element__button-delete');
    if (activeDelete) {
        showDeleteCardButton(deleteButton);
    } else {
        hideDeleteCardButton(deleteButton);
    }

    const likes = card.querySelector('.element__count-like');
    likes.textContent = likeCount;

    return card;
};

const hideDeleteCardButton = (button) => {
    button.classList.add('element__button-delete_disable');
}

const showDeleteCardButton = (button) => {
    button.classList.remove('element__button-delete_disable');
}

function saveCardEvent(event) {
    event.preventDefault();
    showLoading(event.submitter);
    const fields = Object.fromEntries(new FormData(event.target));

    const cardName = fields['card-name'];
    const cardImageLink = fields['card-image-link'];

    const card = {
        name: cardName,
        link: cardImageLink,
        imageDescription: cardName,
        favorite: false,
    }

    addCard({ name: cardName, link: cardImageLink })
        .then(({ _id, name, link }) => {

            const cardElement = createCardElement({ cardId: _id, name, link, imageDescription: name, favorite: false, likeCount: 0, activeDelete: true });

            addCardIntoPage(cardElement);
            closePopup(docCardPopup);
            event.target.reset();
        })
        .catch((error => console.log(error)))
        .finally(() => {
            hideLoading(event.submitter);
        });
}

const openCardImagePopup = (event) => {
    const imageElement = event.target;

    docPopupCardImage.src = imageElement.src;
    docPopupCardImage.alt = imageElement.alt;

    docPopupCardImageDescription.textContent = imageElement.alt;

    openPopup(docCardImagePopup);
}

const deleteCardEvent = (event) => {
    const card = event.target.closest('.element');
    deleteCard(card.cardId)
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
    deleteButton.addEventListener('click', deleteCardEvent);
}

const addCardButton = docPage.querySelector('.profile__button-add');
addCardButton.addEventListener('click', () => {
    openPopup(docCardPopup);
    initValidationSubmitButton(formCard);
});