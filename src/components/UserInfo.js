export class UserInfo {
  constructor(selectorProfileName, selectorProfileInfo) {
    this._name = document.querySelector(selectorProfileName);
    this._info = document.querySelector(selectorProfileInfo);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.info = this._info.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}
