const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');
const docProfilePopup = docPage.querySelector('#popup-profile');
const docCardPopup = docPage.querySelector('#popup-card');
const docCardImagePopup = docPage.querySelector('#popup-card-image');



const profileInfo = {
    name: '(Render)Жак-Ив Куст',
    description: '(Render) Исследователь океанаИсследователь океана',
}


const initialCards = [
    {
        id: 1,
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        imageDescription: 'Архыз',
        favorite: false,
    },
    {
        id: 2,
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        imageDescription: 'Челябинская область',
        favorite: false,
    },
    {
        id: 3,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        imageDescription: 'Иваново',
        favorite: false,
    },
    {
        id: 4,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        imageDescription: 'Камчатка',
        favorite: false,
    },
    {
        id: 5,
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        imageDescription: 'Холмогорский район',
        favorite: false,
    },
    {
        id: 6,
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        imageDescription: 'Байкал',
        favorite: true,
    }
];

function renderPage() {
    updateProfileInfo(profileInfo.name, profileInfo.description);

    subscribeEditProfileButton();
    subscribeCloseProfileButton();
    subscribeSaveProfileButton();
    subscribeAddCardButton();
    subscribeCardPopupCloseButton();
    subscribeSaveCardPopupButton();
    subscribeCardImagePopupCloseButton();

    uploadCards(initialCards);
}

function updateProfileInfo(name, description) {
    const docProfileName = docProfile.querySelector('.profile__name');
    const docProfileDescription = docProfile.querySelector('.profile__description');
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
    profileInfo.name = name;
    profileInfo.description = description;
}

function uploadProfilePopup(name, description) {
    const formNameField = document.getElementsByName('name');
    const formProfileField = document.getElementsByName('profile');

    formNameField[0].value = name;
    formProfileField[0].value = description;
}

function saveProfile(evt) {
    evt.preventDefault();
    const formNameField = document.getElementsByName('name');
    const formProfileField = document.getElementsByName('profile');

    updateProfileInfo(formNameField[0].value, formProfileField[0].value);

    toggleProfilePopup();
}

function toggleProfilePopup() {
    docProfilePopup.classList.toggle('popup_visible');
    if (docProfilePopup.classList.contains('popup_visible')) {
        uploadProfilePopup(profileInfo.name, profileInfo.description);
    }
}

function toggleCardPopup() {
    docCardPopup.classList.toggle('popup_visible');
}

function toggleCardImagePopup() {
    docCardImagePopup.classList.toggle('popup_visible');
}


function createCardElement({ id, name, link, imageDescription, favorite }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    const cardImage = card.querySelector('.element__image');
    cardImage.src = link;
    cardImage.alt = imageDescription;

    card.querySelector('.element__name').textContent = name;

    if (favorite) {
        const button = card.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    const button = card.querySelector('.element__button-like');
    button.cardId = id;
    button.addEventListener('click', toggleCardToFavorite, false);
    card.id = id;
    return card;
}

function addCardIntoPage(card) {
    const elementsContainer = docContent.querySelector('.elements');
    subscribeDeleteCardButton(card);
    subscribeCardImagePopupOpen(card);
    elementsContainer.prepend(card);
}

function addCardIntoStore(card) {
    initialCards.push(card);
}

function deleteCardFromStore(card) {
    const cardId = card.id;
    deltedIndexOfCard = initialCards.findIndex(itemCard => itemCard.id.toString() === cardId);
    initialCards.splice(deltedIndexOfCard,1);
}

function saveCardEvent(event) {
    event.preventDefault();

    const cardName = document.getElementsByName('card-name')[0].value;
    const cardImageLink = document.getElementsByName('card-image-link')[0].value;

    const lastId = initialCards.length === 0 ? 0 : initialCards[initialCards.length - 1].id;

    const id = lastId + 1;

    const card = {
        id,
        name: cardName,
        link: cardImageLink,
        imageDescription: cardName,
        favorite: false,
    }

    const cardElement = createCardElement(card);

    addCardIntoPage(cardElement);
    addCardIntoStore(card);

    toggleCardPopup();
}

function uploadCards(cardStore) {
    cardStore.forEach(card => {
        const createdCard = createCardElement(card);
        addCardIntoPage(createdCard);
    });
}

function toggleCardToFavorite(event) {
    const cardId = event.currentTarget.cardId;

    const filteredCards = initialCards.filter((itemCard) => {
        return itemCard.id === cardId;
    });

    const card = filteredCards[0];
    if (card.favorite) {
        card.favorite = false;
        event.currentTarget.classList.remove('element__button-like_active');
    } else {
        card.favorite = true;
        event.currentTarget.classList.add('element__button-like_active');
    }
}

function openCardImagePopup(event) {
    const imageElement = event.target;
    const popupImage = docCardImagePopup.querySelector('.popup__image');
    popupImage.src = imageElement.src;

    const popupImageDescription = docCardImagePopup.querySelector('.popup__image-description');
    popupImageDescription.textContent = imageElement.alt;

    toggleCardImagePopup();
}

function deleteCard(event) {
    const card = event.target.closest('.element');
    deleteCardFromStore(card);
    card.remove();
}

function subscribeEditProfileButton() {
    const editProfileButton = docProfile.querySelector('.profile__button-edit');
    editProfileButton.addEventListener('click', toggleProfilePopup);
}

function subscribeCloseProfileButton() {
    const closeProfileButton = docProfilePopup.querySelector('.popup__button-close');
    closeProfileButton.addEventListener('click', toggleProfilePopup);
}

function subscribeSaveProfileButton() {
    const formProfile = docProfilePopup.querySelector('.form-popup');
    formProfile.addEventListener('submit', saveProfile);
}

function subscribeAddCardButton() {
    const addCardButton = docPage.querySelector('.profile__button-add');
    addCardButton.addEventListener('click', toggleCardPopup);
}

function subscribeCardPopupCloseButton() {
    const closeCardPopupButton = docCardPopup.querySelector('.popup__button-close');
    closeCardPopupButton.addEventListener('click', toggleCardPopup);
}

function subscribeSaveCardPopupButton() {
    const formCard = docCardPopup.querySelector('.form-popup');
    formCard.addEventListener('submit', saveCardEvent);
}

function subscribeCardImagePopupCloseButton() {
    const closeCardImagePopup = docCardImagePopup.querySelector('.popup__button-close');
    closeCardImagePopup.addEventListener('click', toggleCardImagePopup);
}

function subscribeCardImagePopupOpen(cardElement) {
    const image = cardElement.querySelector('.element__image');
    image.addEventListener('click', openCardImagePopup);
}

function subscribeDeleteCardButton(cardElement) {
    const deleteButton = cardElement.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', deleteCard);
}


renderPage();