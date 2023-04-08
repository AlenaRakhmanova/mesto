export class UserInfo {
  constructor(selectorProfileName, selectorProfileInfo, selectorProfileAvatar) {
    this._name = document.querySelector(selectorProfileName);
    this._info = document.querySelector(selectorProfileInfo);
    this._avatar = document.querySelector(selectorProfileAvatar);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.info = this._info.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserId(data) {
    this._id = data._id;
  }

  getUserId() {
    return this._id;
  }

  setAvatarLink(url) {
    this._avatar.src = url;
  }
}
