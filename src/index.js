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

const imagePopup = new PopupWithImage('#popup-card-image');
imagePopup.setEventListeners();

const addImagePopup = new PopupWithForm('#popup-card', () => { console.log('TEST') });
addImagePopup.setEventListeners();

const api = new Api(config);

api.getCards()
    .then(cards => {
        const cardSection = new Section({
            items: cards, renderer: (item) => {
                const card = new Card(item, '#card-template', (item) => {
                    imagePopup.open(item)
                });
                return card.createCardElement();
            }
        }, '.elements');

        cardSection.renderAllItems();

    })
    .catch(error => console.log(error));


const userInfo = new UserInfo({ userNameSelector: '.profile__name', userAboutSelector: '.profile__description', userAvatarSelector: '.profile__avatar' });
userInfo.getUserInfo(() => {
    return api.getUser()
        .then(user => {
            return user;
        })
        .catch(error => console.log(error));
})


api.getUser()
    .then(user => {
        userInfo.setUserInfo(user);
    })
    .catch(error => console.log(error));





