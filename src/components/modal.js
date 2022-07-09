export const openPopup = (popup) => {
    popup.classList.add('popup_visible');
    popup.addEventListener('click', closePopupOutside);
    document.addEventListener('keydown', closePopupOutsideByEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_visible');
    popup.removeEventListener('click', closePopupOutside);
}

export const closePopupOutsideByEscape = (evt) =>{
    if(evt.key==='Escape'){
        const openedPopup = document.querySelector('.popup_visible');
        document.removeEventListener('keydown', closePopupOutsideByEscape);
        closePopup(openedPopup);
    }
}

export const closePopupOutside = (evt) => {
    const isClosest = evt.target.closest('.popup__container');
    if (!isClosest) {
        closePopup(evt.currentTarget);
    }
}