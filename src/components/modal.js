import {initValidationSubmitButton} from './validate.js';

export const openPopup = (popup,validateSubmit = false) => {
    if(validateSubmit){
        const form = popup.querySelector('.form-popup');
        initValidationSubmitButton(form);
    }
    popup.classList.add('popup_visible');
    popup.addEventListener('click', closePopupOutside);
    document.addEventListener('keydown', closePopupOutsideByEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_visible');
    popup.removeEventListener('click', closePopupOutside);
    document.removeEventListener('keydown', closePopupOutsideByEscape);
}

export const closePopupOutsideByEscape = (evt) =>{
    if(evt.key==='Escape'){
        const openedPopup = document.querySelector('.popup_visible');
        closePopup(openedPopup);
    }
}

export const closePopupOutside = (evt) => {
    const isClosest = evt.target.closest('.popup__container');
    if (!isClosest) {
        closePopup(evt.currentTarget);
    }
}

export const subscribeCloseAllPopup = () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach( popup => {
        popup.addEventListener('click', (evt)=>{
            if(evt.target.classList.contains('popup__button-close')){
                closePopup(popup);
            }
        })
    })
}