class UserRepo {
  constructor(userCatalog) {
    this.userCatalog = userCatalog;
    }

  getUserInfo(userId) {
    let userInfo = this.userCatalog.find((user) => userId === user.id);
    return userInfo;
  }

  getPantry(userId) {
  let pantry = this.getUserInfo(userId).pantry
    return pantry
  }
  // getPantry(userId) {
  //   let userInfo = this.userCatalog.find((user) => userId === user.id);
  //   return userInfo.pantry;
  //   }

}

export default UserRepo;
