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
const cardSection = new Section({items: [], renderer: renderCard}, '.elements');
const userInfo = new UserInfo({ userNameSelector: '.profile__name', userAboutSelector: '.profile__description', userAvatarSelector: '.profile__avatar' });

const renderCard = (item) => {
    const card = new Card(item, '#card-template', (item) => {
        imagePopup.open(item)
    });
    return card.createCardElement();
}

const addCardLogic = (event, values)=>{
    api.addCard({ name: values['card-name'], link: values['card-image-link'] })
    .then(card => {
        cardSection.addItem(card);
    })
    .catch(error => console.log(error));
}


const imagePopup = new PopupWithImage('#popup-card-image');
imagePopup.setEventListeners();

//Инициализация модального окна
const addCardPopup = new PopupWithForm('#popup-card', addCardLogic);
addCardPopup.setEventListeners();
const addCardBtn = document.querySelector('.profile__button-add');
addCardBtn.addEventListener('click', (event)=>{addCardPopup.open()});

//Инициализация модального окна профиля
const profileEditPopup = new PopupWithForm('#popup-profile', (event, values)=>{console.log(event); console.log(values)})
profileEditPopup.setEventListeners();
const profileEditBtn = document.querySelector('.profile__button-edit');
profileEditBtn.addEventListener('click', (event)=>{profileEditPopup.open()});

//Инициализация модального окна реадктирования аватара
const avatarEditPopup = new PopupWithForm('#popup-profile-avatar', (event, values)=>{console.log(event); console.log(values)})
avatarEditPopup.setEventListeners();
const avatarEditBtn = document.querySelector('.profile__button-avatar');
avatarEditBtn.addEventListener('click', (event)=>{avatarEditPopup.open()});


const initCards = (cards) => {
    const cardSection = new Section({items: cards, renderer: renderCard}, '.elements');
    cardSection.renderAllItems();
}

//Ждем загрузки профиля и карточек
Promise.all([api.getUser(), api.getCards()])
        .then(([user, cards]) => {
            initCards(cards);
            userInfo.setUserInfo(user);
        })
        .catch((error => console.log(error)));
        

userInfo.getUserInfo(() => {
    return api.getUser()
        .then(user => {
            return user;
        })
        .catch(error => console.log(error));
})






