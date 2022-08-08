export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._userAvatarSelector = userAvatarSelector;
    }

    getUserInfo(callBack) {
        const userInfo = callBack();
        return userInfo;
    }
    
    setUserInfo(newData) {
        document.querySelector(this._userNameSelector).textContent = newData.name;
        document.querySelector(this._userAboutSelector).textContent = newData.about;
        document.querySelector(this._userAvatarSelector).style.backgroundImage = `url(${newData.avatar})`;
    }
}
