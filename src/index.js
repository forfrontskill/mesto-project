import { enableValidation } from './components/validate.js';
import { startRender } from './components/profile.js';
import { subscribeCloseAllPopup } from './components/modal.js';

import './pages/index.css';

const validationClass = {
    inputSelector: '.form-popup__text-input',
    submitButtonSelector: '.form-popup__button-save',
    inactiveButtonClass: 'form-popup__button-save_disable',
    inputErrorClass: 'form-popup__text-input_error',
    errorClass: 'form-popup__input-error_active'
};

enableValidation(validationClass);
subscribeCloseAllPopup();
startRender();

