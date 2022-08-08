export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
    }

    getUserInfo(callBack) {
        const userInfo = callBack();
        return userInfo;
    }
    
    setUserInfo(newData) {
        this._userNameSelector.textContent = newData.name;
        this._userAboutSelector.textContent = newData.about;
    }
}
