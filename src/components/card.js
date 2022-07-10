import {initValidationSubmitButton} from './validate.js';
import {openPopup, closePopup } from './modal.js';
import { initialCards } from './store/store.js';

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

export const uploadCards = () => {
    initialCards.forEach(card => {
        const createdCard = createCardElement(card);
        addCardIntoPage(createdCard);
    });
}

const createCardElement = ({ name, link, imageDescription, favorite }) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    const cardImage = card.querySelector('.element__image');
    cardImage.src = link;
    cardImage.alt = imageDescription;

    card.querySelector('.element__name').textContent = name;

    if (favorite) {
        const button = card.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    const button = card.querySelector('.element__button-like');

    button.addEventListener('click', toggleCardToFavorite, false);

    return card;
}

const addCardIntoPage = (card) => {
    subscribeDeleteCardButton(card);
    subscribeCardImagePopupOpen(card);
    docElementsContainer.prepend(card);
}

const toggleCardToFavorite = (event) => {
    if (event.currentTarget.classList.contains('element__button-like_active')) {
        event.currentTarget.classList.remove('element__button-like_active');
    } else {
        event.currentTarget.classList.add('element__button-like_active');
    }
}

function saveCardEvent(event){
    event.preventDefault();

    const fields = Object.fromEntries(new FormData(event.target));
    
    const cardName = fields['card-name'];
    const cardImageLink = fields['card-image-link'];

    const card = {
        name: cardName,
        link: cardImageLink,
        imageDescription: cardName,
        favorite: false,
    }

    const cardElement = createCardElement(card);

    addCardIntoPage(cardElement);

    closePopup(docCardPopup);
    event.currentTarget.reset();
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
    card.remove();
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