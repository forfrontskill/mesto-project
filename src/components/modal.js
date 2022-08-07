// export const openPopup = (popup) => {
//     popup.classList.add('popup_visible');
//     popup.addEventListener('mousedown', closePopupOutside);
//     document.addEventListener('keydown', closePopupOutsideByEscape);
// }

// export const closePopup = (popup) => {
//     popup.classList.remove('popup_visible');
//     popup.removeEventListener('mousedown', closePopupOutside);
//     document.removeEventListener('keydown', closePopupOutsideByEscape);
// }

// export const closePopupOutsideByEscape = (evt) => {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_visible');
//         closePopup(openedPopup);
//     }
// }

// export const closePopupOutside = (evt) => {
//     const isClosest = evt.target.closest('.popup__container');
//     if (!isClosest) {
//         closePopup(evt.currentTarget);
//     }
// }

export const subscribeCloseAllPopup = () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button-close')) {
                closePopup(popup);
            }
        })
    })
}

