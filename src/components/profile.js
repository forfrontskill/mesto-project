import { openPopup, closePopup, showLoading, hideLoading } from './modal.js';
import { profileInfo } from './store/store.js';
import { fetchGetUser, fetchUpdateUser, fetchUpdateAvatar } from './api.js';
import { uploadCards } from './card.js';

const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');
const docProfileName = docProfile.querySelector('.profile__name');
const docProfileDescription = docProfile.querySelector('.profile__description');
const docProfilePopup = docPage.querySelector('#popup-profile');
const docAvatarPopup = docPage.querySelector('#popup-profile-avatar');
const docAvatarPopupForm = document.forms.avatarEdit;
const docAvatar = docProfile.querySelector('.profile__avatar');
const docAvatarButton = docProfile.querySelector('.profile__button-avatar');
const formProfile = docProfilePopup.querySelector('.form-popup');


export const renderProfile = () => {

    fetchGetUser()
        .then(({_id, name, about, avatar }) => {
            updateProfileInfo(_id,name, about, avatar);
        }).then(() => {
            uploadCards();
        })
        .catch((error => console.log(error)));
}

const updateProfileInfo = (id, name, about, avatar) => {
    docProfileName.textContent = name;
    docProfileDescription.textContent = about;
    storeProfileUpdate({id, name, about, avatar});
    docAvatar.style.backgroundImage = `url(${avatar})`;
}

const storeProfileUpdate = ({ id, name, about, avatar }) => {
    profileInfo.id = id;
    profileInfo.name = name;
    profileInfo.about = about;
    profileInfo.avatar = avatar;
}

const uploadProfilePopup = (name, description) => {
    formProfile.elements.name.value = name;
    formProfile.elements.profile.value = description;
}

function saveProfile(evt) {
    evt.preventDefault();
    showLoading(docProfilePopup)
    const fields = Object.fromEntries(new FormData(evt.target));
    fetchUpdateUser({ name: fields.name, about: fields.profile })
        .then(({_id, name, about, avatar }) => {
            updateProfileInfo(_id,name, about, avatar);
            closePopup(docProfilePopup);
        })
        .catch((error => console.log(error)))
        .finally(() => {
            hideLoading(docProfilePopup);
        })
}

const editProfileButton = docProfile.querySelector('.profile__button-edit');
editProfileButton.addEventListener('click', () => {
    uploadProfilePopup(profileInfo.name, profileInfo.about);
    openPopup(docProfilePopup);
});

formProfile.addEventListener('submit', saveProfile);

docAvatarButton.addEventListener('click', (evt) => {
    fetchGetUser()
        .then(({ avatar }) => {
            docAvatarPopupForm.elements.linkInput.value = avatar;
            openPopup(docAvatarPopup);
        })
        .catch((error => console.log(error)));
});

docAvatarPopupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    showLoading(docAvatarPopup);
    const avatar = docAvatarPopupForm.elements.linkInput.value;
    fetchUpdateAvatar(avatar)
        .then(({ _id, name, about, avatar }) => {
            updateProfileInfo(_id, name, about, avatar);
            closePopup(docAvatarPopup);
        })
        .catch((error => console.log(error)))
        .finally(() => {
            hideLoading(docAvatarPopup);
        });
});


