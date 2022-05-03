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
}

function updateProfileInfo(name, description){
    const docProfileName = docProfile.querySelector('.profile__name');
    const docProfileDescription = docProfile.querySelector('.profile__description');
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
}

function toggleProfilePopup(){
    console.log('Event toggle profile');
    docProfilePopup.classList.toggle('popup_visible');
}

function subscribeEditProfileButton(){
    const editProfileButton = docProfile.querySelector('.profile__button-edit');
    editProfileButton.addEventListener('click',toggleProfilePopup);
}

function subscribeCloseProfileButton(){
    const closeProfileButton = docProfilePopup.querySelector('.popup__button-close');
    console.log(closeProfileButton);
    closeProfileButton.addEventListener('click',toggleProfilePopup);
}


pageRender();