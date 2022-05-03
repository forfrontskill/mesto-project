const docPage = document.querySelector('.page');
const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');
const docProfilePopup = docPage.querySelector('.popup');


const profileInfo = {
    name: '(Render)Жак-Ив Куст',
    description: '(Render) Исследователь океанаИсследователь океана',
}



function pageRender() {
    console.log('Start Render');
    updateProfileInfo(profileInfo.name, profileInfo.description);
    // toggleProfilePopup();
    subscribeEditProfileButton();
    subscribeCloseProfileButton();
    subscribeSaveProfileButton();
}

function updateProfileInfo(name, description) {
    const docProfileName = docProfile.querySelector('.profile__name');
    const docProfileDescription = docProfile.querySelector('.profile__description');
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
    profileInfo.name = name;
    profileInfo.description = description;
}

function uploadProfilePopup(name, description) {
    const formNameField = document.getElementsByName('name');
    const formProfileField = document.getElementsByName('profile');

    formNameField[0].value = name;
    formProfileField[0].value = description;
}

function saveProfile(evt) {
    console.log(evt);
    evt.preventDefault();
    const formNameField = document.getElementsByName('name');
    const formProfileField = document.getElementsByName('profile');

    updateProfileInfo(formNameField[0].value, formProfileField[0].value);
    
    toggleProfilePopup();
}

function toggleProfilePopup() {
    docProfilePopup.classList.toggle('popup_visible');
    if (docProfilePopup.classList.contains('popup_visible')) {
        console.log('Upload form');
        uploadProfilePopup(profileInfo.name, profileInfo.description);
    }
}

function subscribeEditProfileButton() {
    const editProfileButton = docProfile.querySelector('.profile__button-edit');
    editProfileButton.addEventListener('click', toggleProfilePopup);
}

function subscribeCloseProfileButton() {
    const closeProfileButton = docProfilePopup.querySelector('.popup__button-close');
    closeProfileButton.addEventListener('click', toggleProfilePopup);
}

function subscribeSaveProfileButton() {
    const formProfile= docProfilePopup.querySelector('.form-profile');
    formProfile.addEventListener('submit',saveProfile);
}



pageRender();