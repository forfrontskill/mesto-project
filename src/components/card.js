import { initValidationSubmitButton } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { showLoading, hideLoading } from './utils.js';
import { getCards, addCard, deleteCard, likeCard, dislikeCard } from './api.js';
import { profileInfo } from './store/store.js';
import PopupWithImage from './PopupWithImage.js';

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

export class Card {
    constructor({ cardId, name, link, imageDescription, favorite, likeCount, activeDelete }, selector, handleCardClick) {
        this._cardId = cardId;
        this._name = name;
        this._link = link;
        this._imageDescription = imageDescription;
        this._favorite = favorite;
        this._likeCount = likeCount;
        this._activeDelete = activeDelete;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    createCardElement() {
        const card = cardTemplate.querySelector(this._selector).cloneNode(true);
        const updatedCard = _updateCard(card, {
            cardId: this._cardId,
            name: this._name,
            link: this._link,
            imageDescription: this._imageDescription,
            favorite: this._favorite,
            likeCount: this._likeCount,
            activeDelete: this._activeDelete
        });



        const button = updatedCard.querySelector('.element__button-like');
        button.addEventListener('click', toggleCardToFavorite, false);

        return card;
    }
    _updateCard(card, { cardId, name, link, imageDescription, favorite, likeCount, activeDelete }) {
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

    _toggleCardToFavorite(event) {
        const card = event.target.closest('.element');

        if (event.currentTarget.classList.contains('element__button-like_active')) {
            dislikeCard(card.cardId)
                .then(({ _id, name, link, likes, owner }) => {
                    const ownerId = owner._id;
                    const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
                    _updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
                })
                .catch((error => console.log(error)));
        } else {
            likeCard(card.cardId)
                .then(({ _id, name, link, likes, owner }) => {
                    const ownerId = owner._id;
                    const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
                    _updateCard(card, { cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
                })
                .catch((error => console.log(error)));
        }
    }

    _initCardInfo({ likes, ownerId }) {
        const activeDelete = ownerId === profileInfo.id;
        const likeCount = likes.length;
        const isUserLiked = likes.some(like => like._id === profileInfo.id);
        return { likeCount, isUserLiked, activeDelete };
    }

    _hideDeleteCardButton(button) {
        button.classList.add('element__button-delete_disable');
    }

    _showDeleteCardButton(button) {
        button.classList.remove('element__button-delete_disable');
    }

    _deleteCardEvent = (event) => {
        const card = event.target.closest('.element');
        deleteCard(card.cardId)
            .then((res) => {
                card.remove();
            })
            .catch((error => console.log(error)))
    }  

    _openCardImagePopup = (event) => {
        const imageElement = event.target;
    
        docPopupCardImage.src = imageElement.src;
        docPopupCardImage.alt = imageElement.alt;
    
        docPopupCardImageDescription.textContent = imageElement.alt;
        
        PopupWithImage.open();

        openPopup(docCardImagePopup);
    }

    _setEventListeners() {
        const image = cardElement.querySelector('.element__image');
        image.addEventListener('click', (event) => this._handleCardClick(card));

        const deleteButton = cardElement.querySelector('.element__button-delete');
        deleteButton.addEventListener('click', (event) => this._deleteCardEvent(event));
    }
}


const addCardButton = docPage.querySelector('.profile__button-add');



addCardButton.addEventListener('click', () => {
    openPopup(docCardPopup);
    initValidationSubmitButton(formCard);
});

export const uploadCards = (cards) => {
    cards.forEach(({ _id, name, link, likes, owner }) => {
        const ownerId = owner._id;
        const { likeCount, isUserLiked, activeDelete } = initCardInfo({ likes, ownerId });
        const createdCard = createCardElement({ cardId: _id, name, link, imageDescription: name, favorite: isUserLiked, likeCount, activeDelete });
        addCardIntoPage(createdCard);
    })
}

const addCardIntoPage = (card) => {
    subscribeDeleteCardButton(card);
    subscribeCardImagePopupOpen(card);
    docElementsContainer.prepend(card);
}

function _saveCardEvent(event) {
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

