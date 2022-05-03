const docContent = document.querySelector('.content');
const docProfile = docContent.querySelector('.profile');


const profileInfo = {
    name: '(Render)Жак-Ив Куст',
    description: '(Render) Исследователь океанаИсследователь океана',
}



function pageRender() {
    console.log('Start Render');
    updateProfileInfo(profileInfo.name, profileInfo.description);
    toggleProfilePopup();
}

function updateProfileInfo(name, description){
    const docProfileName = docProfile.querySelector('.profile__name');
    const docProfileDescription = docProfile.querySelector('.profile__description');
    docProfileName.textContent = name;
    docProfileDescription.textContent = description;
}

function toggleProfilePopup(){
    const docPage = document.querySelector('.page');
    const docProfilePopup = docPage.querySelector('.popup');
    docProfilePopup.classList.toggle('popup_visible');
}


pageRender();