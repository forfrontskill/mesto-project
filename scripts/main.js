import { initialCards, profileInfo } from './store.js';

const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');
const docProfileName = docProfile.querySelector('.profile__name');
const docProfileDescription = docProfile.querySelector('.profile__description');
const docElementsContainer = docContent.querySelector('.elements');
const docProfilePopup = docPage.querySelector('#popup-profile');
const docCardPopup = docPage.querySelector('#popup-card');
const docCardImagePopup = docPage.querySelector('#popup-card-image');
const docPopupCardImage = docCardImagePopup.querySelector('.popup__image');
const docPopupCardImageDescription = docCardImagePopup.querySelector('.popup__image-description');

const cardTemplate = document.querySelector('#card-template').content;

const editProfileButton = docProfile.querySelector('.profile__button-edit');
editProfileButton.addEventListener('click', () => {
    uploadProfilePopup(profileInfo.name, profileInfo.description);
    openPopup(docProfilePopup);
});

const closeProfileButton = docProfilePopup.querySelector('.popup__button-close');
closeProfileButton.addEventListener('click', () => {
    closePopup(docProfilePopup);
});

const formProfile = docProfilePopup.querySelector('.form-popup');
formProfile.addEventListener('submit', saveProfile);

const addCardButton = docPage.querySelector('.profile__button-add');
addCardButton.addEventListener('click', () => {
    openPopup(docCardPopup);
});

const closeCardPopupButton = docCardPopup.querySelector('.popup__button-close');
closeCardPopupButton.addEventListener('click', () => {
    closePopup(docCardPopup);
});

const formCard = docCardPopup.querySelector('.form-popup');
formCard.addEventListener('submit', saveCardEvent);

const closeCardImagePopup = docCardImagePopup.querySelector('.popup__button-close');
closeCardImagePopup.addEventListener('click', () => {
    closePopup(docCardImagePopup);
});

function subscribeCardImagePopupOpen(cardElement) {
    const image = cardElement.querySelector('.element__image');
    image.addEventListener('click', openCardImagePopup);
}

function subscribeDeleteCardButton(cardElement) {
    const deleteButton = cardElement.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', deleteCard);
}



function renderPage() {
    updateProfileInfo(profileInfo.name, profileInfo.description);

    uploadCards(initialCards);
}

function updateProfileInfo(name, description) {
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
    profileInfo.name = name;
    profileInfo.description = description;
}

function uploadProfilePopup(name, description) {
    formProfile.elements.name.value = name;
    formProfile.elements.profile.value = description;
}

function saveProfile(evt) {
    evt.preventDefault();

    console.log(evt.target);

    const fields = Object.fromEntries(new FormData(evt.target));

    updateProfileInfo(fields.name, fields.profile);

    closePopup(docProfilePopup);
}

function openPopup(popup) {
    popup.classList.add('popup_visible');
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
}


function createCardElement({ name, link, imageDescription, favorite }) {
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

function addCardIntoPage(card) {
    subscribeDeleteCardButton(card);
    subscribeCardImagePopupOpen(card);
    docElementsContainer.prepend(card);
}

function saveCardEvent(event) {
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
}

function uploadCards(cardStore) {
    cardStore.forEach(card => {
        const createdCard = createCardElement(card);
        addCardIntoPage(createdCard);
    });
}

function toggleCardToFavorite(event) {
    if (event.currentTarget.classList.contains('element__button-like_active')) {
        event.currentTarget.classList.remove('element__button-like_active');
    } else {
        event.currentTarget.classList.add('element__button-like_active');
    }
}

function openCardImagePopup(event) {
    const imageElement = event.target;

    docPopupCardImage.src = imageElement.src;
    docPopupCardImage.alt = imageElement.alt;

    docPopupCardImageDescription.textContent = imageElement.alt;

    openPopup(docCardImagePopup);
}

function deleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
}

renderPage();