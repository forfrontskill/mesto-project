import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import './pages/index.css';
import Api from './components/api.js';
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

const config = {
    tokenId: '0b2a6895-6ec2-4474-a82a-666be5c4ddd6',
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: tokenId,
        'Content-Type': 'application/json'
    }
}




