import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import './pages/index.css';
import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const cardSectionSelector = '.elements';

const validationClass = {
    inputSelector: '.form-popup__text-input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save_disable',
    inputErrorClass: 'form-popup__text-input_error',
    errorClass: 'form-popup__input-error_active'
};

const tokenId = '0b2a6895-6ec2-4474-a82a-666be5c4ddd6';

const config = {
    tokenId,
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: tokenId,
        'Content-Type': 'application/json'
    }
}

//Инициализация валидации всех форм
const addCardFormValidator = new FormValidator(validationClass, document.forms['card-create']);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(validationClass, document.forms['profile-edit']);
profileEditFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validationClass, document.forms['avatarEdit']);
avatarEditFormValidator.enableValidation();

//Глобавльные классы
const api = new Api(config);

const renderCard = (item) => {
    const { userId } = userInfo.getUserInfo();
    console.log('userId:' + userId);
    const card = new Card(item,
        '#card-template',
        (item) => { imagePopup.open(item) },
        userId,
        ()=>{console.log('Like')},
        ()=>{console.log('dislike')}
    );
    return card.createCardElement();
}

const cardSection = new Section({ items: [], renderer: renderCard }, '.elements');
const userInfo = new UserInfo(
    {
        userNameSelector: '.profile__name',
        userAboutSelector: '.profile__description',
        userAvatarSelector: '.profile__avatar'
    }
);

//Ждем загрузки профиля и карточек
Promise.all([api.getUser(), api.getCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        initCards(cards);
    })
    .catch((error => console.log(error)));

const addCardLogic = (event, values) => {
    api.addCard({ name: values['card-name'], link: values['card-image-link'] })
        .then(card => {
            cardSection.addItem(card);
        })
        .catch(error => console.log(error));
}

const updateAvatar = (event, values) => {
    api.updateAvatar(values['linkInput'])
        .then(({ avatar }) => {
            const user = userInfo.getUserInfo();
            userInfo.setUserInfo({ ...user, avatar });
        })
        .catch(error => console.log(error));
}


const imagePopup = new PopupWithImage('#popup-card-image');
imagePopup.setEventListeners();

//Инициализация модального окна
const addCardPopup = new PopupWithForm('#popup-card', addCardLogic);
addCardPopup.setEventListeners();
const addCardBtn = document.querySelector('.profile__button-add');
addCardBtn.addEventListener('click', (event) => {
    addCardFormValidator.initValidationSubmitButton();
    addCardPopup.open()
});

//Инициализация модального окна профиля
const profileEditPopup = new PopupWithForm('#popup-profile', (event, values) => { console.log(event); console.log(values) })
profileEditPopup.setEventListeners();
const profileEditBtn = document.querySelector('.profile__button-edit');
profileEditBtn.addEventListener('click', (event) => {
    profileEditPopup.setInputValues((form) => {
        const { name, about } = userInfo.getUserInfo();
        form.elements.name.value = name;
        form.elements.profile.value = about;
    })
    profileEditFormValidator.initValidationSubmitButton();
    profileEditPopup.open()
});

//Инициализация модального окна реадктирования аватара
const avatarEditPopup = new PopupWithForm('#popup-profile-avatar', updateAvatar)
avatarEditPopup.setEventListeners();
const avatarEditBtn = document.querySelector('.profile__button-avatar');
avatarEditBtn.addEventListener('click', (event) => {
    avatarEditFormValidator.initValidationSubmitButton();
    avatarEditPopup.open()
});



const initCards = (cards) => {
    const cardSection = new Section({ items: cards, renderer: renderCard }, '.elements');
    cardSection.renderAllItems();
}









