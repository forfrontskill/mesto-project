export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._nameElementValue = document.querySelector(userNameSelector);
        this._aboutElementValue = document.querySelector(userAboutSelector);
        this._avatarElementValue = document.querySelector(userAvatarSelector);
        this._name = '';
        this._avatar = '';
        this._about = '';
        this._id = '';
    }

    getUserInfo() {
        return { name: this._name, about: this._about, avatar: this._avatar };
    }

    setUserInfo({_id, name, about, avatar}) {
        this._name = name;
        this._avatar = avatar;
        this._about = about;
        this._id = _id;
        this._nameElementValue.textContent = name;
        this._aboutElementValue.textContent = about;
        this._avatarElementValue.style.backgroundImage = `url(${avatar})`;
    }
}
