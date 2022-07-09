import {openPopup, closePopup } from './modal.js';
import { profileInfo } from './store/store.js';

const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');
const docProfileName = docProfile.querySelector('.profile__name');
const docProfileDescription = docProfile.querySelector('.profile__description');
const docProfilePopup = docPage.querySelector('#popup-profile');


const formProfile = docProfilePopup.querySelector('.form-popup');
formProfile.addEventListener('submit', saveProfile);

export const renderProfile = () => {
    updateProfileInfo(profileInfo.name, profileInfo.description);
}

const updateProfileInfo = (name, description) => {
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
    profileInfo.name = name;
    profileInfo.description = description;
}

const uploadProfilePopup = (name, description) => {
    formProfile.elements.name.value = name;
    formProfile.elements.profile.value = description;
}

function saveProfile(evt){
    evt.preventDefault();

    const fields = Object.fromEntries(new FormData(evt.target));

    updateProfileInfo(fields.name, fields.profile);

    closePopup(docProfilePopup);
}

const editProfileButton = docProfile.querySelector('.profile__button-edit');
editProfileButton.addEventListener('click', () => {
    uploadProfilePopup(profileInfo.name, profileInfo.description);
    openPopup(docProfilePopup);
});

const closeProfileButton = docProfilePopup.querySelector('.popup__button-close');
closeProfileButton.addEventListener('click', () => {
    closePopup(docProfilePopup);
});