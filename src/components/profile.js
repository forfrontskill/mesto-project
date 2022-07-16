import { openPopup, closePopup } from './modal.js';
import { showLoading, hideLoading } from './utils.js';
import { profileInfo } from './store/store.js';
import { getUser, updateUser, updateAvatar, getCards } from './api.js';
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


export const startRender = () => {
    Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            updateProfileInfo(user);
            uploadCards(cards);
        })
        .catch((error => console.log(error)));
}


const updateProfileInfo = ({_id, name, about, avatar}) => {
    docProfileName.textContent = name;
    docProfileDescription.textContent = about;
    storeProfileUpdate({ id:_id, name, about, avatar });
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
    showLoading(evt.submitter)
    const fields = Object.fromEntries(new FormData(evt.target));
    updateUser({ name: fields.name, about: fields.profile })
        .then((user) => {
            updateProfileInfo(user);
            closePopup(docProfilePopup);
        })
        .catch((error => console.log(error)))
        .finally(() => {
            hideLoading(evt.submitter);
        })
}

const editProfileButton = docProfile.querySelector('.profile__button-edit');
editProfileButton.addEventListener('click', () => {
    uploadProfilePopup(profileInfo.name, profileInfo.about);
    openPopup(docProfilePopup);
});

formProfile.addEventListener('submit', saveProfile);

docAvatarButton.addEventListener('click', (evt) => {
            openPopup(docAvatarPopup);
});

docAvatarPopupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    showLoading(evt.submitter);
    const avatar = docAvatarPopupForm.elements.linkInput.value;
    updateAvatar(avatar)
        .then((user) => {
            updateProfileInfo(user);
            closePopup(docAvatarPopup);
        })
        .catch((error => console.log(error)))
        .finally(() => {
            hideLoading(evt.submitter);
        });
});


